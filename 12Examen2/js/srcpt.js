const stephenKingApiUrl = "https://stephen-king-api.onrender.com/api/";

const stephenKingGallery = () => {
    let allBooks = [];
    let currentFilteredBooks = [];

    const images = {
        imgBookNotFound: "https://via.placeholder.com/300x400/8b0000/ffffff?text=Libro+No+Encontrado",
        imgLoading: "https://i.gifer.com/ZKZg.gif",
    };

    const imageTemplate = "<img class='loading-img' src='{imgSrc}' alt='loading' style='max-width: 200px; margin: 20px auto; display: block;'/>";
    
    const cardTemplate = `
        <div class="card" data-book-id="{bookId}">
            <h3>{title}</h3>
            <div class="card-info">
                <strong>Año:</strong> {year}
            </div>
            <div class="card-info">
                <strong>Páginas:</strong> {pages}
            </div>
            {publisherInfo}
            <div class="sinopsis">
                <strong>Pasa el mouse para ver más detalles</strong>
            </div>
        </div>
    `;

    const containers = {
        loadingContainer: document.getElementById("loading-container"),
        galeriaContainer: document.getElementById("galeria"),
        modalElement: document.getElementById("modal"),
        modalBody: document.getElementById("modal-body"),
        closeModal: document.querySelector(".close")
    };

    const controls = {
        bookInput: document.getElementById("bookName"),
        selectOrder: document.getElementById("selectOrder")
    };

    const buttons = {
        all: Array.from(document.getElementsByClassName("btn")),
        search: document.getElementById("btnSearch"),
        reset: document.getElementById("btnReset")
    };

    const setLoading = () => {
        containers.loadingContainer.innerHTML = imageTemplate.replace("{imgSrc}", images.imgLoading);
        buttons.all.forEach(button => button.disabled = true);
    };

    const setLoadingComplete = () => {
        containers.loadingContainer.innerHTML = "";
        buttons.all.forEach(button => button.disabled = false);
    };

    const getBooksData = async () => fetch(`${stephenKingApiUrl}books`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then((res) => res.json())
        .then((data) => data.data)
        .catch((error) => ({requestFailed: true}));

    const searchBookByName = (bookName) => {
        if (!bookName || bookName.trim() === "") {
            return allBooks;
        }
        
        const searchTerm = bookName.toLowerCase();
        return allBooks.filter(book => 
            book.Title.toLowerCase().includes(searchTerm)
        );
    };

    const orderBooks = (books, orderType) => {
        let orderedBooks = [...books];
        
        switch(orderType) {
            case 'año-asc':
                orderedBooks.sort((a, b) => a.Year - b.Year);
                break;
            case 'año-desc':
                orderedBooks.sort((a, b) => b.Year - a.Year);
                break;
            case 'titulo':
                orderedBooks.sort((a, b) => a.Title.localeCompare(b.Title));
                break;
            default:
                break;
        }
        
        return orderedBooks;
    };

    const processBooks = (books) => {
        containers.galeriaContainer.innerHTML = "";
        
        if (books.length === 0) {
            containers.galeriaContainer.innerHTML = `
                <div style="text-align:center; grid-column: 1/-1; padding: 50px;">
                    <img src="${images.imgBookNotFound}" alt="No encontrado" style="max-width: 300px; margin-bottom: 20px;">
                    <p style="font-size: 1.5rem;">No se encontraron libros</p>
                </div>
            `;
            return;
        }
        
        books.forEach((book) => {
            const publisherInfo = book.Publisher 
                ? `<div class="card-info"><strong>Editorial:</strong> ${book.Publisher}</div>` 
                : '';
            
            const cardHTML = cardTemplate
                .replace("{bookId}", book.id)
                .replace("{title}", book.Title || 'Sin título')
                .replace("{year}", book.Year || 'N/A')
                .replace("{pages}", book.Pages || 'N/A')
                .replace("{publisherInfo}", publisherInfo);
            
            containers.galeriaContainer.innerHTML += cardHTML;
        });
        
        addCardListeners();
    };

    const addCardListeners = () => {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.onclick = () => {
                const bookId = card.getAttribute('data-book-id');
                const book = currentFilteredBooks.find(b => b.id == bookId);
                if (book) {
                    showModal(book);
                }
            };
        });
    };

    const showModal = (book) => {
        const villainsInfo = book.villains && book.villains.length > 0
            ? `<p><strong>Villanos:</strong></p>
               <ul>${book.villains.map(v => `<li>${v.name}</li>`).join('')}</ul>`
            : '<p><strong>Villanos:</strong> No disponible</p>';
        
        containers.modalBody.innerHTML = `
            <h2>${book.Title}</h2>
            <p><strong>Año:</strong> ${book.Year || 'N/A'}</p>
            <p><strong>Páginas:</strong> ${book.Pages || 'N/A'}</p>
            <p><strong>Editorial:</strong> ${book.Publisher || 'N/A'}</p>
            <p><strong>ISBN-13:</strong> ${book.ISBN || 'N/A'}</p>
            ${villainsInfo}
        `;
        
        containers.modalElement.style.display = 'block';
    };

    const closeModal = () => {
        containers.modalElement.style.display = 'none';
    };

    const loadAndDisplayBooks = async () => {
        setLoading();
        
        const booksData = await getBooksData();
        
        if (booksData.requestFailed) {
            containers.loadingContainer.innerHTML = 'Error al cargar los libros. Intenta recargar la página.';
            Swal.fire({
                title: "Error!",
                text: "No se pudieron cargar los libros. Por favor, intenta de nuevo.",
                icon: "error",
                confirmButtonText: "Aceptar",
            });
            setLoadingComplete();
            return;
        }
        
        allBooks = booksData;
        currentFilteredBooks = allBooks;
        processBooks(allBooks);
        setLoadingComplete();
    };

    const performSearch = () => {
        const bookName = controls.bookInput.value;
        
        if (!bookName || bookName.trim() === "") {
            Swal.fire({
                title: "Aviso",
                text: "Ingresa el nombre de un libro para buscar",
                icon: "info",
                confirmButtonText: "Aceptar",
            });
            return;
        }
        
        const filteredBooks = searchBookByName(bookName);
        const orderType = controls.selectOrder.value;
        currentFilteredBooks = orderBooks(filteredBooks, orderType);
        processBooks(currentFilteredBooks);
    };

    const resetGallery = () => {
        controls.bookInput.value = "";
        controls.selectOrder.value = "";
        currentFilteredBooks = allBooks;
        processBooks(allBooks);
    };

    const applyOrder = () => {
        const orderType = controls.selectOrder.value;
        currentFilteredBooks = orderBooks(currentFilteredBooks, orderType);
        processBooks(currentFilteredBooks);
    };

    const triggers = () => {
        buttons.search.onclick = () => performSearch();
        
        controls.bookInput.onkeyup = (event) => {
            event.preventDefault();
            if (event.key === "Enter") {
                performSearch();
            }
        };
        
        buttons.reset.onclick = () => resetGallery();
        
        controls.selectOrder.onchange = () => applyOrder();
        
        containers.closeModal.onclick = () => closeModal();
        
        window.onclick = (event) => {
            if (event.target === containers.modalElement) {
                closeModal();
            }
        };
    };

    loadAndDisplayBooks();
    triggers();
};

window.onload = stephenKingGallery;