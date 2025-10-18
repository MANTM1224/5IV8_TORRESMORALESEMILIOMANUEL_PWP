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
  var num1 = parseFloat(document.getElementById("p2-num1").value);
  var num2 = parseFloat(document.getElementById("p2-num2").value);
  var num3 = parseFloat(document.getElementById("p2-num3").value);

  if (isNaN(num1) || isNaN(num2) || isNaN(num3)) {
    document.getElementById("p2-resultado").innerText = "Por favor, ingrese números válidos.";
    return;
  }
  var mayor = Math.max(num1, num2, num3);
  document.getElementById('p2-output').textContent = 
        `Números ingresados: ${num1}, ${num2}, ${num3}\nEl número mayor es: ${mayor}`;
}

function problema3() {

}

function problema4() {
  
}