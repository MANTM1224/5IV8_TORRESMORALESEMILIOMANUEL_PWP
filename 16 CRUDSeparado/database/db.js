const mysql2 = require('mysql2');

const db = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'n0m3l0',
    database: 'cursosdb'
});

db.connect((err) => {
    if (err) {
        console.error('Error de conexion: ' + err.stack);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

module.exports = db;