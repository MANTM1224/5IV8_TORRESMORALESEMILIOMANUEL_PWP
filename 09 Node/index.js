const { response } = require('express');
var http = require('http');

// Vamos a crear nuestro propio servidor

var servidor = http.createServer(function(req, res){
    //req es una solicitud viene por parte de la arquitectura cliente-servidor, todos los clienets (navegadores, usuarios, aplicaciones, servicios, etc), son los que realizan una peticion
    //por parte del protocolo
    //res es la respuesta que el servidor le da al cliente

    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.write('<h1>Hola Mundo con Node.js</h1>');
    console.log('Hola si entro');
    res.end();
});

//es necesario tener un puerto de comunicacion para el servidor
servidor.listen(3000);

console.log('Servidor ejecutandose en http://localhost:3000/');