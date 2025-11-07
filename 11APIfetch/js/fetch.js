// Esta es una API REST que nos permite obtener información sobre diferentes pokémon puedes ver la estructura de la información
// en https://pokeapi.co/, de esta forma nuestra app de frontend se comunicará con un backend
const pokeApiUrl = "https://pokeapi.co/api/v2/";
const pokedex = () => {
    // Estes es un objeto auxiliar que nos permite acceder a los campos destinados a mostrar las
    // estadísticas del pokemon a buscar, como puedes ver, es haciendo uso de la API de DOM que vimos anteriormente
    const pokemonStatsElements = {
        hp: document.getElementById("pokemonStatHp"),
        attack: document.getElementById("pokemonStatAttack"),
        defense: document.getElementById("pokemonStatDefense"),
        specialAttack: document.getElementById("pokemonStatSpecialAttack"),
        specialDefense: document.getElementById("pokemonStatSpecialDefense"),
        speed: document.getElementById("pokemonStatSpeed"),
    };
    // Este es una referencia auxiliar que nos permitirá utilizar las clases que están en el archivo de CSS de acuerdo al tipo de pokemon
    let currentClassType = null;
    // Este es una simple cadena que nos ayudará a crear una imagen
    const imageTemplate = "<img class='pokedisplay' src='{imgSrc}' alt='pokedisplay'/>";
    // Este objeto simplemente guarda las rutas de imágenes de apoyo que se utilizaran cuando esperemos el resultado de la búsqueda
    // o cuando no se encuentre el pokemon solicitado
    const images = {
        imgPokemonNotFound: "./img/404.png",
        imgLoading: "./img/loading.gif",
    };
    // Este objeto contiene las referencias de los elementos que desplegarán la información del pokémon
    const containers = {
        imageContainer: document.getElementById("pokedisplay-container"),
        pokemonTypesContainer: document.getElementById("pokemonTypes"),
        pokemonNameElement: document.getElementById("pokemonNameResult"),
        pokemonAbilitiesElement: document.getElementById("pokemonAbilities"),
        pokemonMovesElement: document.getElementById("pokemonMoves"),
        pokemonIdElement: document.getElementById("pokemonId")
    };
    // Este objeto contiene las referencias de los botones
    const buttons = {
        all: Array.from(document.getElementsByClassName("btn")),
        search: document.getElementById("btnSearch"),
        next: document.getElementById("btnUp"),
        previous: document.getElementById("btnDown")
    };
    // Esta es la referencia al campo de texto que usa el usuario para escribir el nombre
    const pokemonInput = document.getElementById("pokemonName");
    // La agrupación de los elementos en objetos simplemente da una mejor estructura al código, de igual manera, es conveniente
    // separar los segmentos del código en funciones más pequeñas, de esta manera no solo se tiene un mejor orden, sino que
    // nos ahorrará problemas a la hora de depurar posibles errores en el código pues será más fácil determinar que es lo que
    // no está funcionando adecuadamente.

    // Esta función muestra el tipo de pokemon, recibe el resultado de la búsqueda de la API
    const processPokemonTypes = (pokemonData) => {
        let pokemonType = "";
        // Utilizo la primera clase para dar el color a los contenedores de movimientos y habilidades
        const firstClass = pokemonData.types[0].type.name;

        // ¿De dónde sale types, como sé es un arreglo? En la página de pokeapi(https://pokeapi.co/) puedes ver un ejemplo
        // del objeto que responde, pokemonData es ese objeto
        pokemonData.types.forEach((pokemonTypeData) => {
            // Se crea una etiqueta de clases por cada elemento type del arreglo
            pokemonType += `<span class="pokemon-type ${pokemonTypeData.type.name}">${pokemonTypeData.type.name}</span>`;
        });
        // Se quita la clase previa del contenedor de habilidades y movimientos si hay una
        if (currentClassType) {
            containers.pokemonMovesElement.classList.remove(currentClassType);
            containers.pokemonAbilitiesElement.classList.remove(currentClassType);
        }
        // Se agrega la clase del tipo del contenedor de habilidades y movimientos
        containers.pokemonMovesElement.classList.add(firstClass);
        containers.pokemonAbilitiesElement.classList.add(firstClass);
        currentClassType = firstClass;
        // Se agregan las etiquetas creadas previamente en nuestro forEach
        containers.pokemonTypesContainer.innerHTML = pokemonType;
    };
    // Procesa las estadísticas del pokemon, recibe el objeto completo de la respuesta de la pokeapi
    const processPokemonStats = (pokemonData) => {
        // El operador '?.' se llama encadenamiento opcional, si el elemento a la izquierda es null o undefined
        // no ejecuta lo que esta a la derecha, más en https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Optional_chaining
        pokemonData.stats?.forEach((pokemonStatData) => {
            // Evalua el nombre de la estadística, y coloca su valor en su respectivo contenedor, y le aplica un
            // estilo de gradiente, para hacer más visual el efecto.
            switch (pokemonStatData.stat.name) {
                case "hp":
                    pokemonStatsElements.hp.innerHTML = pokemonStatData.base_stat;
                    pokemonStatsElements.hp.style = `background: linear-gradient(0deg, rgba(0,118,255,1) ${pokemonStatData.base_stat}%, rgba(0,0,0,1) ${pokemonStatData.base_stat}%); `;
                    break;
                case "attack":
                    pokemonStatsElements.attack.innerHTML = pokemonStatData.base_stat;
                    pokemonStatsElements.attack.style = `background: linear-gradient(0deg, rgba(0,118,255,1) ${pokemonStatData.base_stat}%, rgba(0,0,0,1) ${pokemonStatData.base_stat}%); `;
                    break;
                case "defense":
                    pokemonStatsElements.defense.innerHTML = pokemonStatData.base_stat;
                    pokemonStatsElements.defense.style = `background: linear-gradient(0deg, rgba(0,118,255,1) ${pokemonStatData.base_stat}%, rgba(0,0,0,1) ${pokemonStatData.base_stat}%); `;
                    break;
                case "special-attack":
                    pokemonStatsElements.specialAttack.innerHTML = pokemonStatData.base_stat;
                    pokemonStatsElements.specialAttack.style = `background: linear-gradient(0deg, rgba(0,118,255,1) ${pokemonStatData.base_stat}%, rgba(0,0,0,1) ${pokemonStatData.base_stat}%); `;
                    break;
                case "special-defense":
                    pokemonStatsElements.specialDefense.innerHTML = pokemonStatData.base_stat;
                    pokemonStatsElements.specialDefense.style = `background: linear-gradient(0deg, rgba(0,118,255,1) ${pokemonStatData.base_stat}%, rgba(0,0,0,1) ${pokemonStatData.base_stat}%); `;
                    break;
                case "speed":
                    pokemonStatsElements.speed.innerHTML = pokemonStatData.base_stat;
                    pokemonStatsElements.speed.style = `background: linear-gradient(0deg, rgba(0,118,255,1) ${pokemonStatData.base_stat}%, rgba(0,0,0,1) ${pokemonStatData.base_stat}%); `;
                    break;
            }
        });
    };
    // Procesa los movimientos del pokemon, y los coloca en su respectivo contenedor
    const processPokemonMoves = (pokemonData) => {
        let pokemonMovesContent = "";
        pokemonData.moves?.forEach((pokemonMove) => {
            pokemonMovesContent += `<li>${pokemonMove.move.name}</li>`;
        });
        containers.pokemonMovesElement.innerHTML = pokemonMovesContent;
    };
    // Procesa las habilidades del pokemon, y los coloca en su respectivo contenedor
    const processPokemonAbilities = (pokemonData) => {
        let pokemonAbilitiesContent = "";
        pokemonData.abilities?.forEach((pokemonAbility) => {
            pokemonAbilitiesContent += `<li>${pokemonAbility.ability.name}</li>`;
        });
        containers.pokemonAbilitiesElement.innerHTML = pokemonAbilitiesContent;
    };
    // Pone la imagen de cargando y deshabilita los botones
    const setLoading = () => {
        containers.imageContainer.innerHTML = imageTemplate.replace("{imgSrc}", images.imgLoading);
        buttons.all.forEach(button => button.disabled = true);
    };
    // Vuelve a habilitar los botones
    const setLoadingComplete = () => {
        buttons.all.forEach(button => checkDisabled(button));
    };
    /***********************************************************************************************************/
    // Esta función es la que consulta la pokeapi para obtener la información del pokemon solicitado
    // fetch nos sirve para hacer solicitudes a otros sitios, pero también se puede usar para cargar archivos locales
    // fetch recibe la url del recurso o destino de la petición, y un objeto que nos ayuda a establecer algunos parámetros
    // de la petición, fetch devuelve una promesa, por eso tiene un then y un catch, por otro lado, getPokemonData, devuelve
    // un objeto json con la información del pokemon, o en caso de error, el objeto json contiene el campo que indica que
    // la petición falló https://developer.mozilla.org/es/docs/Web/API/Fetch_API/Using_Fetch
    const getPokemonData = async (pokemonName) => fetch(`${pokeApiUrl}pokemon/${pokemonName}`, {
        // Existen varios métodos HTTP que sirven, entre otras cosas, para especificar el tipo de petición, pero también
        // son necesarios para enviar adecuadamente sus parámetros https://developer.mozilla.org/es/docs/Web/HTTP/Methods
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        // En las cabeceras de la petición se puede especificar el tipo de información que vamos a utilizar, también
        // aquí se suelen colocar, por ejemplo la identidad del usuario por si la petición requiere alguna información
        // de este o por motivos de seguridad https://developer.mozilla.org/es/docs/Web/HTTP/Headers/Content-Type
        headers: {
            'Content-Type': 'application/json'
        },
        // body: JSON.stringify(miObjetoJson)||"" IMPORTANTE:Cuando tu petición use un cuerpo(por ejemplo post y put), debes convertirlo a string
    })
        .then((res) => res.json())
        .catch((error) => ({requestFailed: true}));
    /***********************************************************************************************************/
    // válida si debe deshabilitar los botones o no, en este caso, únicamente el botón inferior, si está en el ID 1,
    // ya que no hay pokemon con ID negativo
    const checkDisabled = (button) => {
        button.disabled = button.id === "btnDown" && containers.pokemonIdElement.value <= 1;
    };
    // Esta es la función principal, válida que reciba un nombre o ID y realiza la búsqueda del pokemon y procesa
    // la respuesta para colocar los datos en sus respectivos elementos HTML
    const setPokemonData = async (pokemonName) => {
        if (pokemonName) {
            // pone la imagen de búsqueda y deshabilita los botones en lo que realiza la consulta
            setLoading();
            // realiza la consulta, en este caso, con await espera hasta tener respuesta, primero utilizo un operador
            // ternario para poner el nombre en minúsculo si es string
            // operador ternario: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
            // await: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/await
            const pokemonData = await getPokemonData(typeof pokemonName === typeof "" ? pokemonName.toLowerCase() : pokemonName);
            if (pokemonData.requestFailed) {
                // Si no se encontró el pokemon, se pone la imagen de no encontrado
                containers.imageContainer.innerHTML = imageTemplate.replace("{imgSrc}", images.imgPokemonNotFound);
            } else {
                // Pone las imágenes del pokemon, su nombre y el ID del pokemon
                containers.imageContainer.innerHTML = `
        ${imageTemplate.replace("{imgSrc}", pokemonData.sprites.front_default)}
        ${imageTemplate.replace("{imgSrc}", pokemonData.sprites.front_shiny)}
                `;
                containers.pokemonNameElement.innerHTML = pokemonData.name;
                containers.pokemonIdElement.value = pokemonData.id;
                // reparte el resto de procesamientos pertinentes a cada función
                processPokemonTypes(pokemonData);
                processPokemonStats(pokemonData);
                processPokemonAbilities(pokemonData);
                processPokemonMoves(pokemonData);
            }
            // vuelve a habilitar los botones.
            setLoadingComplete();
        } else {
            // Esta es la forma de utilizar SweetAlert 2, por si te interesa aprender más sobre su uso puedes revisar su
            // sitio oficial https://sweetalert2.github.io/ pero no es necesario.
            Swal.fire({
                title: "Error!",
                text: "Ingresa el nombre de un pokémon primero",
                icon: "error",
                confirmButtonText: "Aceptar.",
            });
        }
    };

    const triggers = () => {
        // se le vincula la función de búsqueda al botón de buscar.
        buttons.search.onclick = () => setPokemonData(pokemonInput.value);
        // se le vincula la función de búsqueda al campo de texto para buscar cuando presionan enter
        pokemonInput.onkeyup = (event) => {
            event.preventDefault();
            if (event.key === "Enter") {
                setPokemonData(pokemonInput.value);
            }
        }
        // se le vincula la función de búsqueda al arriba y abajo, estos funcionan con el ID en lugar del campo de texto.
        buttons.next.onclick = () => setPokemonData(+containers.pokemonIdElement.value + 1);
        buttons.previous.onclick = () => setPokemonData(+containers.pokemonIdElement.value - 1);
    };
    setLoadingComplete();
    triggers();
};

window.onload = pokedex;
