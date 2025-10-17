var instrucciones = [
    "Utiliza las flechas de navegacion para mover las piezas,",
    "Para ordemar las piezas guiate por la imagen objetivo"
];
//vamos a guardar dentro de una variable del rompecabezas
var movimientos = [

];

//vamos a crear una matriz para saber la posicion de los rompecabezas
var rompe = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

var rompeCorrecta = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

//necesito saber las coordenadas de la pieza vacia, la que se va a mover
var filaVacia = 2;
var columnaVacia = 2;

//necesitamos una funcion que se encarge de mostrar las instrucciones
function mostrarInstrucciones(instrucciones) {
    for (var i = 0; i < instrucciones.length; i++) {
        mostrarInstruccionesLista(instrucciones[i], "lista-instrucciones");
    }
}
//esta funcion se encarga de crear el componente li u agregar la lista de dicahs instrucciones
function mostrarInstruccionesLista(instruccion, idLista) {
    var ul = document.getElementById(idLista);
    var li = document.createElement("li");
    li.textContent = instruccion;
    ul.appendChild(li);
}
//vamos a crear una funcion para saber que gano
function checarSiGano() {
    for (var i = 0; i < rompe.length; i++) {
        for (var j = 0; j < rompe[i].length; j++) {
            var rompeactual = rompe[i][j];
            if (rompeactual !== rompeCorrecta[i][j]) {
                return false;

            
            }
        }
    }
    return true;
}
//mostrar en html si se gano
function mostrarCartelGanador() {
    if (checarSiGano()) {
        alert("Felicidades, ganaste el juego");
    }
    return false
}
/*
necesitamos una funcion que se encargue de poder intercambiar las pocisiones e las piexa vacia vs cualquiera, para esto tenemos que hacer el uso de:
    arreglo[][] = posicion[][]
    //intercambiar
    posicion[][] = arreglo[][]
*/
function intercambiarPosicionesRompe(filapos1, columnapos1, filapos2, columnapos2) {
    var pos1 = rompe[filapos1,columnapos1]
    var pos2 = rompe[filapos2,columnapos2]

    rompe[filapos1,columnapos1] = pos2;
    rompe[filapos2,columnapos2] = pos1;
}

function iniciar(){
    //mezclar las piezas

    //capturar el last movimiento
}

//mandamos traer la funcion
mostrarInstrucciones(instrucciones);

