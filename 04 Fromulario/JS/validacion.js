/*
JAVASCRIPT ES UN LENGUAJE MULTIPARADIGMA,
Acepta la programacion funcional, estructurada, orientada a objetos, 
Eventos
Dentro de JS, no existe el tipado de variables int, String, float, etc.
solo existen 3 tipos de variables de acuerdo al estandar ES6
var -> variable global o local, se puede reasignar y redeclarar
let -> variable local, se puede reasignar pero no redeclarar
const -> variable local, no se puede reasignar ni redeclarar

*/

function validar(formulario){
//QUIERO VALIDAR QUE EL CAMPO NOMBRE ACEPTE MAS DE 3 CARACTERES
    if(formulario.nombre.value.length < 4){
        alert("Por favor escribe mas de 3 caracteres en campo nombre");
        formulario.nombre.focus();
        return false;
    }
    
}
