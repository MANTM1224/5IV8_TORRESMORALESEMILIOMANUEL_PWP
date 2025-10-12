function validarn(e) {
    var teclado = (document.all) ? e.keyCode : e.which;
    if (teclado == 8) return true;
    var patron = /[0-9\d .]/;
    var prueba = String.fromCharCode(teclado);
    return patron.test(codigo);
}

function calcularPorcentajes(){
    var hombres = document.getElementById("hombres").value;
    var mujeres = document.getElementById("mujeres").value;

    var parseoHombres = parseFloat(hombres);
    var parseoMujeres = parseFloat(mujeres);

    alert("Hombres: " + parseoHombres);
    alert("Mujeres: " + parseoMujeres);

    var toralEstudiantes = parseoHombres + parseoMujeres;
    alert("El total de estudiantes es: " + toralEstudiantes);

    var porcentajeHombres = (parseoHombres / toralEstudiantes) * 100;
    alert("El porcentaje de hombres es: " + porcentajeHombres.toFixed(2) + "%");
    var porcentajeMujeres = (parseoMujeres / toralEstudiantes) * 100;
    alert("El porcentaje de mujeres es: " + porcentajeMujeres.toFixed(2) + "%");

    document.getElementById("total").value = toralEstudiantes;
    document.getElementById("porcentajehombres").value = porcentajeHombres.toFixed(2) + "%";
    document.getElementById("porcentajemujeres").value = porcentajeMujeres.toFixed(2) + "%";
}

function borrarDatos(){
    document.getElementById("hombres").value = "";
    document.getElementById("mujeres").value = "";
    document.getElementById("total").value = "";
    document.getElementById("porcentajehombres").value = "";
    document.getElementById("porcentajemujeres").value = "";
}