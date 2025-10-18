function problema1() {
    var num1 = parseFloat(document.getElementById("p1-num1").value);
    var num2 = parseFloat(document.getElementById("p1-num2").value);

    if (isNaN(num1) || isNaN(num2)) {
        document.getElementById("p1-resultado").innerText = "Por favor, ingrese números válidos.";
        return;
    }

    var resultado;
    var operacion;

    if(num1 == num2){
        resultado = num1 * num2;
        operacion = "multiplicación";
    } else if (num1 > num2) {
        resultado = num1 - num2;
        operacion = "resta";
    } else {
        resultado = num1 + num2;
        operacion = "suma";
    }

    document.getElementById('p1-output').textContent = 
        `Números: ${num1} y ${num2}\nOperación: ${operacion}\nResultado: ${resultado}`;
}

function problema2() {
  
}

function problema3() {

}

function problema4() {
  
}