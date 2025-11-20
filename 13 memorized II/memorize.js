function memo(a, b) {
    let cache = {};
    let rep = 0;
    
    let operacion = (a,b) => { return a+b; };

    return function (a, b) {
        let key = a + ',' + b;
        if (!(key in cache)) {
            cache[key] = operacion(a, b);
            rep++;
        }
        return cache[key] + " llamadas: " + rep;
    };
}

let suma = memo();

console.log(suma(10,4));    
console.log(suma(10,4)); 
console.log(suma(5,3));
console.log(suma(5,3)); 
console.log(suma(4,10));
