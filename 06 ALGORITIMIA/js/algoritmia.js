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

function problema3(){
    //tarea
}