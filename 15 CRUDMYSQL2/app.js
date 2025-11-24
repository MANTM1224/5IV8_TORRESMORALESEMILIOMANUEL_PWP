/*
CRUD de Bitácora de Inspecciones Diarias - CECyT 9
Sistema para registrar inspecciones de mantenimiento
*/

const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const ejs = require('ejs');

require('dotenv').config({path: './.env'});

const app = express();
const port = 3000;

const bd = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'torresmanuel1.',
    database: 'bitacora_inspecciones_cecyt'
});

bd.connect((error) => {
    if (error) {
        console.log('Error de conexion a la base de datos: ' + error);
    } else {
        console.log('Conexion exitosa a la base de datos');
    }
});

//configurar middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use('/css', express.static(__dirname + '/css'));

//RUTAS DEL CRUD

//ruta GET para mostrar formulario y lista de inspecciones
app.get('/', (req, res) => {
    const query = 'SELECT * FROM inspecciones_diarias ORDER BY fecha_hora DESC';
    bd.query(query, (error, resultados) => {
        if(error){
            console.log('Error al obtener las inspecciones: ' + error);
            res.status(500).send('Error al obtener las inspecciones');
        } else {
            res.render('index', { inspecciones: resultados });
        }
    });
});

//ruta POST para crear una inspeccion
app.post('/inspecciones', (req, res) => {
    const { fecha_hora, area_sector, punto_control, estado, observaciones, seguimiento_requerido, inspector } = req.body;
    
    console.log('Datos recibidos:', fecha_hora, area_sector, punto_control, estado, observaciones, seguimiento_requerido, inspector);
    
    const query = 'INSERT INTO inspecciones_diarias (fecha_hora, area_sector, punto_control, estado, observaciones, seguimiento_requerido, inspector) VALUES (?, ?, ?, ?, ?, ?, ?)';
    
    bd.query(query, [fecha_hora, area_sector, punto_control, estado, observaciones, seguimiento_requerido, inspector], (error, resultados) => {
        if (error) {
            console.log('Error al crear la inspeccion: ' + error);
            res.status(500).send('Error al crear la inspeccion');
        } else {
            res.redirect('/');
        }
    });
});

//ruta GET para eliminar inspeccion
app.get('/inspecciones/delete/:id', (req, res) => {
    const inspeccionId = req.params.id;
    const query = 'DELETE FROM inspecciones_diarias WHERE id = ?';
    
    bd.query(query, [inspeccionId], (error, resultados) => {
        if(error){
            console.log('Error al eliminar la inspeccion: ' + error);
            res.status(500).send('Error al eliminar la inspeccion');
        } else {
            res.redirect('/');
        }
    });
});

//ruta GET para mostrar formulario de edicion
app.get('/inspecciones/edit/:id', (req, res) => { 
    const inspeccionId = req.params.id;
    const query = 'SELECT * FROM inspecciones_diarias WHERE id = ?';
    
    bd.query(query, [inspeccionId], (error, resultados) => {
        if(error){
            console.log('Error al obtener la inspeccion: ' + error);
            res.status(500).send('Error al obtener la inspeccion');
        } else if (!resultados || resultados.length === 0) {
            res.status(404).send('Inspeccion no encontrada');
        } else {
            res.render('edit', { inspeccion: resultados[0] });  
        }
    });
});

//ruta POST para actualizar inspeccion
app.post('/inspecciones/update/:id', (req, res) => {
    const inspeccionId = req.params.id;
    const { fecha_hora, area_sector, punto_control, estado, observaciones, seguimiento_requerido, inspector } = req.body;
    
    const query = 'UPDATE inspecciones_diarias SET fecha_hora = ?, area_sector = ?, punto_control = ?, estado = ?, observaciones = ?, seguimiento_requerido = ?, inspector = ? WHERE id = ?';
    
    bd.query(query, [fecha_hora, area_sector, punto_control, estado, observaciones, seguimiento_requerido, inspector, inspeccionId], (error, resultados) => {
        if(error){
            console.log('Error al actualizar la inspeccion: ' + error);
            res.status(500).send('Error al actualizar la inspeccion');
        } else {
            res.redirect('/');
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});