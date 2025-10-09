
function validarn(e){
    var teclado = (document.all)? e.keyCode:e.which;
    if(teclado == 8) return true;
    var patron = /[0-9\d .]/;
    var codigo = String.fromCharCode(teclado);
    return patron.test(codigo);
}

// funcion para calcular el interes
//Delimitar el numero de decimales
function interes(){
    var valor = document.getElementById("cantidadi").value;
    var parseo = parseFloat(valor);
    alert(parseo);
    var interes = parseo * 0.085; //limite a 2 decimales
    alert(interes);
    var total = parseo + interes;
    alert(total);
    document.getElementById("saldoi").value = "$" + total.toFixed(2); // limite a 2 decimales
}
function borrari(){
    document.getElementById("cantidadi").value = "";
    document.getElementById("saldoi").value = "";
}


/*
del ejercicio 1, tenemos que agregar el campo numero de meses y sera una inversion de maximo 18 meses
 
2.- se deben ingresar 3 ventas, un sueldo base, y despues calcular el monto total, debe aparecer el cuanto cobre por comision y la suma total

3.- se debe de ingresar un producto con su precio 

4.- se debe de ingresar calif1, calif2, calif3 se aplican el promedio y su personaje, se ingresa trabajo final y se aplica porcentaje y examen final se aplican el piorcentaje se debe de mostrar el total de calificaciones

5.- cantidad de hombres y de mujeres, se debe de mostrar y sus porcentajes correspondientes

6.- calcular la edad de una persona
*/
