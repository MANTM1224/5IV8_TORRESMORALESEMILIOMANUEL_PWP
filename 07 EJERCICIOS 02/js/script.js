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
    var horasTrabajadas = parseFloat(document.getElementById('p3-horas').value);
    var salarioPorHora = parseFloat(document.getElementById('p3-salario').value);
    var outputElement = document.getElementById('p3-output');


    if (isNaN(horasTrabajadas) || isNaN(salarioPorHora) || horasTrabajadas < 0 || salarioPorHora < 0) {
        outputElement.textContent = 'Por favor, ingrese valores válidos (números positivos)';
        return;
    }
    
    var pagoTotal = 0;
    var pagoNormal = 0;
    var pagoExtrasDobles = 0;
    var pagoExtrasTriples = 0;
    
    if (horasTrabajadas <= 40) {
        pagoNormal = horasTrabajadas * salarioPorHora;
        pagoTotal = pagoNormal;
    } else {
        pagoNormal = 40 * salarioPorHora;
        
        var horasExtras = horasTrabajadas - 40;
        
        
        if (horasExtras <= 8) {
            pagoExtrasDobles = horasExtras * (salarioPorHora * 2);
        } else {
            
            pagoExtrasDobles = 8 * (salarioPorHora * 2);
            
           
            var horasExtrasTriples = horasExtras - 8;
            pagoExtrasTriples = horasExtrasTriples * (salarioPorHora * 3);
        }
        
        pagoTotal = pagoNormal + pagoExtrasDobles + pagoExtrasTriples;
    }
    
    
    var resultado = `CÁLCULO DE PAGO\n`;
    resultado += `${'='.repeat(50)}\n\n`;
    resultado += `Horas trabajadas: ${horasTrabajadas} hrs\n`;
    resultado += `Salario por hora: $${salarioPorHora.toFixed(2)}\n\n`;
    resultado += `DESGLOSE:\n`;
    resultado += `-`.repeat(50) + `\n`;
    
    if (horasTrabajadas <= 40) {
        resultado += `Horas normales (${horasTrabajadas} hrs): $${pagoNormal.toFixed(2)}\n`;
    } else {
        resultado += `Horas normales (40 hrs): $${pagoNormal.toFixed(2)}\n`;
        
        var horasExtras = horasTrabajadas - 40;
        if (horasExtras <= 8) {
            resultado += `Horas extras x2 (${horasExtras} hrs): $${pagoExtrasDobles.toFixed(2)}\n`;
        } else {
            resultado += `Horas extras x2 (8 hrs): $${pagoExtrasDobles.toFixed(2)}\n`;
            resultado += `Horas extras x3 (${(horasExtras - 8).toFixed(1)} hrs): $${pagoExtrasTriples.toFixed(2)}\n`;
        }
    }
    
    resultado += `\n${'='.repeat(50)}\n`;
    resultado += `PAGO TOTAL: $${pagoTotal.toFixed(2)}`;
    
    outputElement.textContent = resultado;
}


function problema4() {
  
}