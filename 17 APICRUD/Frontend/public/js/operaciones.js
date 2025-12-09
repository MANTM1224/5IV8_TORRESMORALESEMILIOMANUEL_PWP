function createNewItem(event) {
    event.preventDefault();

    const name = document.getElementById('newItemName').value;
    const price = parseFloat(document.getElementById('newItemPrice').value);
    const stock = parseInt(document.getElementById('newItemStock').value);
    const categoryId = document.getElementById('newItemCategoryId').value;

    let id = categoryId+1;

    const newItem = {
        categoryid: categoryId,
        name: name,
        price: price,
        stock: stock,
        
    };

    fetch('/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newItem)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Producto creado:', data);
        // Aquí puedes agregar código para actualizar la interfaz de usuario después de crear el producto
    })
    .catch(error => {
        console.error('Error al crear el producto:', error);
    });
}