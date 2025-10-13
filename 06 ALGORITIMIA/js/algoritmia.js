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
    //este es mio
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

