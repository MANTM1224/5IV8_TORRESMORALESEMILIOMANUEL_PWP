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

//Funciones de validación
function validarTexto(texto, min = 1, max = 255) {
    if (!texto || typeof texto !== 'string') return false;
    const textoTrimmed = texto.trim();
    
    // Validar que no contenga emojis (rango Unicode común de emojis)
    const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F000}-\u{1F02F}\u{1F0A0}-\u{1F0FF}\u{1F100}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{FE00}-\u{FE0F}\u{1F200}-\u{1F2FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}]/u;
    if (emojiRegex.test(textoTrimmed)) return false;
    
    return textoTrimmed.length >= min && textoTrimmed.length <= max;
}

function validarFechaHora(fechaHora) {
    if (!fechaHora) return false;
    const fecha = new Date(fechaHora);
    if (!(fecha instanceof Date) || isNaN(fecha)) return false;
    
    // Validar que el año no sea mayor a 2026
    const año = fecha.getFullYear();
    if (año > 2026) return false;
    
    return true;
}

function validarEstado(estado) {
    return estado === 'OK' || estado === 'Fallo';
}

function validarSeguimiento(seguimiento) {
    return seguimiento === 'Sí' || seguimiento === 'No';
}

function sanitizarTexto(texto) {
    if (!texto) return '';
    // Eliminar caracteres peligrosos y emojis
    const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F000}-\u{1F02F}\u{1F0A0}-\u{1F0FF}\u{1F100}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{FE00}-\u{FE0F}\u{1F200}-\u{1F2FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}]/gu;
    return texto.trim().replace(/[<>]/g, '').replace(emojiRegex, '');
}

//RUTAS DEL CRUD

//ruta GET para mostrar formulario y lista de inspecciones
app.get('/', (req, res) => {
    const errorMsg = req.query.error || null;
    const query = 'SELECT * FROM inspecciones_diarias ORDER BY fecha_hora DESC';
    bd.query(query, (error, resultados) => {
        if(error){
            console.log('Error al obtener las inspecciones: ' + error);
            res.status(500).send('Error al obtener las inspecciones');
        } else {
            res.render('index', { inspecciones: resultados, error: errorMsg });
        }
    });
});

//ruta POST para crear una inspeccion
app.post('/inspecciones', (req, res) => {
    const { fecha_hora, area_sector, punto_control, estado, observaciones, seguimiento_requerido, inspector } = req.body;
    
    if (!validarFechaHora(fecha_hora)) {
        return res.redirect('/?error=' + encodeURIComponent('Fecha y hora inválidas o año mayor a 2026'));
    }
    
    if (!validarTexto(area_sector, 3, 100)) {
        return res.redirect('/?error=' + encodeURIComponent('Área/Sector debe tener entre 3 y 100 caracteres'));
    }
    
    if (!validarTexto(punto_control, 3, 255)) {
        return res.redirect('/?error=' + encodeURIComponent('Punto de control debe tener entre 3 y 255 caracteres'));
    }
    
    if (!validarEstado(estado)) {
        return res.redirect('/?error=' + encodeURIComponent('Estado inválido. Debe ser OK o Fallo'));
    }
    
    if (observaciones && observaciones.trim().length > 500) {
        return res.redirect('/?error=' + encodeURIComponent('Las observaciones no deben exceder 500 caracteres'));
    }
    
    if (!validarSeguimiento(seguimiento_requerido)) {
        return res.redirect('/?error=' + encodeURIComponent('Seguimiento requerido inválido. Debe ser Sí o No'));
    }
    
    if (!validarTexto(inspector, 3, 100)) {
        return res.redirect('/?error=' + encodeURIComponent('Inspector debe tener entre 3 y 100 caracteres'));
    }
    
    const areaSanitizada = sanitizarTexto(area_sector);
    const puntoSanitizado = sanitizarTexto(punto_control);
    const observacionesSanitizadas = sanitizarTexto(observaciones);
    const inspectorSanitizado = sanitizarTexto(inspector);
    
    console.log('Datos recibidos:', fecha_hora, areaSanitizada, puntoSanitizado, estado, observacionesSanitizadas, seguimiento_requerido, inspectorSanitizado);
    
    const query = 'INSERT INTO inspecciones_diarias (fecha_hora, area_sector, punto_control, estado, observaciones, seguimiento_requerido, inspector) VALUES (?, ?, ?, ?, ?, ?, ?)';
    
    bd.query(query, [fecha_hora, areaSanitizada, puntoSanitizado, estado, observacionesSanitizadas, seguimiento_requerido, inspectorSanitizado], (error, resultados) => {
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
    
    if (!validarFechaHora(fecha_hora)) {
        return res.redirect('/?error=' + encodeURIComponent('Fecha y hora inválidas o año mayor a 2026'));
    }
    
    if (!validarTexto(area_sector, 3, 100)) {
        return res.redirect('/?error=' + encodeURIComponent('Área/Sector debe tener entre 3 y 100 caracteres'));
    }
    
    if (!validarTexto(punto_control, 3, 255)) {
        return res.redirect('/?error=' + encodeURIComponent('Punto de control debe tener entre 3 y 255 caracteres'));
    }
    
    if (!validarEstado(estado)) {
        return res.redirect('/?error=' + encodeURIComponent('Estado inválido. Debe ser OK o Fallo'));
    }
    
    if (observaciones && observaciones.trim().length > 500) {
        return res.redirect('/?error=' + encodeURIComponent('Las observaciones no deben exceder 500 caracteres'));
    }
    
    if (!validarSeguimiento(seguimiento_requerido)) {
        return res.redirect('/?error=' + encodeURIComponent('Seguimiento requerido inválido. Debe ser Sí o No'));
    }
    
    if (!validarTexto(inspector, 3, 100)) {
        return res.redirect('/?error=' + encodeURIComponent('Inspector debe tener entre 3 y 100 caracteres'));
    }
    
    const areaSanitizada = sanitizarTexto(area_sector);
    const puntoSanitizado = sanitizarTexto(punto_control);
    const observacionesSanitizadas = sanitizarTexto(observaciones);
    const inspectorSanitizado = sanitizarTexto(inspector);
    
    const query = 'UPDATE inspecciones_diarias SET fecha_hora = ?, area_sector = ?, punto_control = ?, estado = ?, observaciones = ?, seguimiento_requerido = ?, inspector = ? WHERE id = ?';
    
    bd.query(query, [fecha_hora, areaSanitizada, puntoSanitizado, estado, observacionesSanitizadas, seguimiento_requerido, inspectorSanitizado, inspeccionId], (error, resultados) => {
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