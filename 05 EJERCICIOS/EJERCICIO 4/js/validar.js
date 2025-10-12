function validarn(e) {
    var teclado = (document.all) ? e.keyCode : e.which;
    if (teclado == 8) return true;
    var patron = /[0-9\d .]/;
    var prueba = String.fromCharCode(teclado);
    return patron.test(codigo);
}

function calcularCalificacion(){

    var parcial1 = document.getElementById("parcial1").value;
    var parcial2 = document.getElementById("parcial2").value;
    var parcial3 = document.getElementById("parcial3").value;
    var examenFinal = document.getElementById("examenfinal").value;
    var trabajoFinal = document.getElementById("trabajofinal").value;

    var parseoParcial1 = parseFloat(parcial1);
    var parseoParcial2 = parseFloat(parcial2);
    var parseoParcial3 = parseFloat(parcial3);
    var parseoExamenFinal = parseFloat(examenFinal);
    var parseoTrabajoFinal = parseFloat(trabajoFinal);

    alert("Parcial 1:" + parseoParcial1);
    alert("Parcial 2:" + parseoParcial2);
    alert("Parcial 3:" + parseoParcial3);
    alert("Examen Final:" + parseoExamenFinal);
    alert("Trabajo Final:" + parseoTrabajoFinal);

    var promedioParciales = (parseoParcial1 + parseoParcial2 + parseoParcial3) / 3;
    alert("El promedio de los parciales es: " + promedioParciales.toFixed(2));

    var porcentajeParciales = promedioParciales * 0.55;
    alert("El porcentaje de los parciales es: " + porcentajeParciales.toFixed(2));
    var porcentajeExamenFinal = parseoExamenFinal * 0.30;
    alert("El porcentaje del examen final es: " + porcentajeExamenFinal.toFixed(2));
    var porcentajeTrabajoFinal = parseoTrabajoFinal * 0.15;
    alert("El porcentaje del trabajo final es: " + porcentajeTrabajoFinal.toFixed(2));

    var calificacionFinal = porcentajeParciales + porcentajeExamenFinal + porcentajeTrabajoFinal;
    alert("La calificación final es: " + calificacionFinal.toFixed(2));

   document.getElementById("promedio").value = porcentajeParciales.toFixed(2);
   document.getElementById("examen").value = porcentajeExamenFinal.toFixed(2);
   document.getElementById("trabajo").value = porcentajeTrabajoFinal.toFixed(2);
   document.getElementById("calificacionfinal").value = calificacionFinal.toFixed(2);
}

function borrarDatos(){
    document.getElementById("parcial1").value = "";
    document.getElementById("parcial2").value = "";
    document.getElementById("parcial3").value = "";
    document.getElementById("examenfinal").value = "";
    document.getElementById("trabajofinal").value = "";
    document.getElementById("promedio").value = "";
    document.getElementById("examen").value = "";
    document.getElementById("trabajo").value = "";
    document.getElementById("calificacionfinal").value = "";


}
    