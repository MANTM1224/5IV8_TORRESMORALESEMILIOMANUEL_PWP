function validarn(e) {
    var teclado = (document.all) ? e.keyCode : e.which;
    if (teclado == 8) return true;
    var patron = /[0-9\d .]/;
    var prueba = String.fromCharCode(teclado);
    return patron.test(codigo);
}

function calcularDescuento(){
    var totalCompra = document.getElementById("totalcompra").value;

    var parseoTotal = parseFloat(totalCompra);
    alert("El total de la compra es: $" + parseoTotal.toFixed(2));

    var descuento = parseoTotal * 0.15;
    alert("El descuento es: $" + descuento.toFixed(2));

    var totalPagar = parseoTotal - descuento;
    alert("El total a pagar con descuento es: $" + totalPagar.toFixed(2));

    document.getElementById("descuento").value = "$" + descuento.toFixed(2);
    document.getElementById("totalpagar").value = "$" + totalPagar.toFixed(2);
}

function borrarDatos(){
    document.getElementById("totalcompra").value = "";
    document.getElementById("descuento").value = "";
    document.getElementById("totalpagar").value = "";
    alert("Los datos han sido borrados");
}