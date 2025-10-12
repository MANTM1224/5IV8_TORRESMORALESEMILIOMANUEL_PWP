function validarn(e) {
    var teclado = (document.all) ? e.keyCode : e.which;
    if (teclado == 8) return true;
    var patron = /[0-9]/;
    var prueba = String.fromCharCode(teclado);
    return patron.test(prueba); 
}

function calcularEdad(){
    var añonacimiento = document.getElementById("añon").value;

    if(añonacimiento == "" || añonacimiento == null){
        alert("Por favor, introduce tu año de nacimiento");
        return;
    }

    var parseañonacimiento = parseInt(añonacimiento);
  
    if(isNaN(parseañonacimiento)){
        alert("Por favor, introduce un año válido");
        return;
    }

    var fechaActual = new Date();
    var añoActual = fechaActual.getFullYear();


    if(parseañonacimiento > añoActual){
        alert("El año de nacimiento no puede ser mayor al año actual (" + añoActual + ")");
        return;
    }

 
    if(parseañonacimiento < 1925){
        alert("Por favor, introduce un año de nacimiento válido (mayor a 1900)");
        return;
    }

    var edad = añoActual - parseañonacimiento;

    if(edad < 0 || edad > 100){
        alert("La edad calculada no es válida. Debe estar entre 0 y 100 años");
        return;
    }

    alert("Año de nacimiento: " + parseañonacimiento);
    alert("Tu edad es: " + edad);

    document.getElementById("edada").value = edad + " años"; 
}

function borrarDatos(){
    document.getElementById("añon").value = "";
    document.getElementById("edada").value = "";
    alert("Datos borrados");
}