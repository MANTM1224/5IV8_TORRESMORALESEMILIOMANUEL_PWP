const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

//primero las configuraciones de las rutas
const cursosRouter = require('../routers/cursosRouters.js');

const app = express();

const db = require('../database/db.js');

//configuramos las vistas

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//configuro el middleware
app.use(express.json());
app.use(cors());


//vamos a generar una vista estatica
app.use(express.static(path.join(__dirname, 'views')));

//necesito ver mi pagina de cursos
app.get('/vista/cursos-ejs', (req, res) => {
    //redireccionar para consumir
    res.redirect('/vista/cursos-ejs');
});

//ruta de bienvenida
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'bienvenida.html'));     
});

//vamos a renderizar la ruta de consulta
app.get('/vista/cursos-ejs', (req, res) => {
    const sql = ('SELECT * FROM cursos', (error, resultado) => {
        if (error) {
            console.error('Error al obtener los cursos: ' + error.message);
            res.status(500).send('Error al obtener los cursos');
            return res.render('cursos', {cursos:[]});
        }
        return res.render('cursos', {cursos: resultado});
    });
});
    

//usar las rutas
app.use('/cursos', cursosRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
    