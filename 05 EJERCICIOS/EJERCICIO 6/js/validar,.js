function validarn(e) {
    var teclado = (document.all) ? e.keyCode : e.which;
    if (teclado == 8) return true;
    var patron = /[0-9\d .]/;
    var prueba = String.fromCharCode(teclado);
    return patron.test(prueba); 
}

function calcularEdad(){
    var añonacimiento = document.getElementById("añon").value;

    var parseañonacimiento = parseInt(añonacimiento);
    alert("Año de nacimiento: " + parseañonacimiento);

    var fechaActual = new Date();
    var añoActual = fechaActual.getFullYear();

    var edad = añoActual - parseañonacimiento;
    alert("Tu edad es: " + edad);

    document.getElementById("edada").value = edad + " años"; 
}

function borrarDatos(){
    document.getElementById("añon").value = "";
    document.getElementById("edada").value = "";
    alert("Datos borrados");
}