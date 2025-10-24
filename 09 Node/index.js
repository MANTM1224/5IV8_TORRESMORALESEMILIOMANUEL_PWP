var http = require('http');

//vamos a crear nuestro propio sv

var servidor = http.createServer(function (req, res) {
    //req -> request es una solicitud y viene x parte de la arquitectura cliente servidor, todos los clientes (navegadores, ususarios, apps, servicios etc) son los que realizan una peticion por parte del protocolo
    //res -> response es la respuesta que el servidor le da al cliente
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    //aqui se genera una respuesta

    res.write('<h1>Hola Mundo desde Node.js</h1>');
    res.write('<h1>A mimir</h1>');
    res.write('<h1>o ya no jeje</h1>');
    console.log('hola jeje si entro');
    res.end();
});

//es necesario tener un puerto de comunicacion para el sv

servidor.listen(3000);

console.log('Servidor escuchando en http://localhost:3000');