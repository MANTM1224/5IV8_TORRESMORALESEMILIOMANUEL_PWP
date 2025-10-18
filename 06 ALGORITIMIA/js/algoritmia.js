function problema1(){
    const input = document.getElementById("p1-input").value;
    const output = document.getElementById("p1-output");

    if(input.trim() === ""){
        output.textContent = "Por favor, ingresa algunas palabras.";
        return;
    }

    const palabrasInvertidas = input.split(" ").reverse().join(" ");
    output.textContent = palabrasInvertidas;
}

function problema2(){
     var v1 = [
    parseFloat(document.getElementById("p2-x1").value) || 0,
    parseFloat(document.getElementById("p2-x2").value) || 0,
    parseFloat(document.getElementById("p2-x3").value) || 0,
    parseFloat(document.getElementById("p2-x4").value) || 0,
    parseFloat(document.getElementById("p2-x5").value) || 0
  ];

  var v2 = [
    parseFloat(document.getElementById("p2-y1").value) || 0,
    parseFloat(document.getElementById("p2-y2").value) || 0,
    parseFloat(document.getElementById("p2-y3").value) || 0,
    parseFloat(document.getElementById("p2-y4").value) || 0,
    parseFloat(document.getElementById("p2-y5").value) || 0
  ];


  v1.sort((a, b) => a - b);
  v2.sort((a, b) => b - a);

  var producto = 0;
  for (var i = 0; i < v1.length; i++) {
    producto += v1[i] * v2[i];
  }

  document.getElementById("p2-output").textContent = `El producto escalar mínimo es: ${producto}`;
}


function Problema3() {

    const input = document.getElementById('p3-input').value;
    

    const output = document.getElementById('p3-output');
    

    if (input.trim() === '') {
        output.textContent = 'Por favor, ingresa al menos una palabra.';
        return;
    }

    const palabras = input.split(',');
    

    if (palabras.length === 0) {
        output.textContent = 'No se encontraron palabras válidas.';
        return;
    }
    
    let palabraConMasCaracteres = '';
    let maxCaracteresUnicos = 0;
    
   
    palabras.forEach(palabra => {
        
        const palabraLimpia = palabra.trim().toUpperCase();
        
     
        const caracteresUnicos = contarCaracteresUnicos(palabraLimpia);
        
     
        if (caracteresUnicos > maxCaracteresUnicos) {
            maxCaracteresUnicos = caracteresUnicos;
            palabraConMasCaracteres = palabraLimpia;
        }
    });
    
    
    output.textContent = `Palabra con más caracteres únicos: ${palabraConMasCaracteres}\nCaracteres únicos: ${maxCaracteresUnicos}`;
}

function contarCaracteresUnicos(palabra) {
    const caracteresUnicos = new Set();

    for (let i = 0; i < palabra.length; i++) {
        const char = palabra[i];
        if (char >= 'A' && char <= 'Z') {
            caracteresUnicos.add(char);
        }
    }
    
    return caracteresUnicos.size;
}

