const mysql2 = require('mysql')

const db = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cursos_db'
});

db.connect((err) => {
    if (err) {
        console.error('Error de conexión a la base de datos: ', err.stack);
        return;
    }
    console.log('Conexión exitosa a la base de datos MySQL');
});