/*
    GATO DE GATOS - Ultimate Tic-Tac-Toe
    Proyecto con MySQL para guardar usuarios y puntuaciones
*/

const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Configuración de MySQL
const bd = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'torresmanuel1.',
    database: 'gato_de_gatos'
});

bd.connect((error) => {
    if (error) {
        console.log('Error de conexión a la base de datos: ' + error);
        console.log('Asegúrate de ejecutar el script database.sql primero');
    } else {
        console.log('✅ Conexión exitosa a la base de datos');
    }
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configurar vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Archivos estáticos
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/public', express.static(path.join(__dirname, 'public')));

// ==================== RUTAS ====================

// Página principal - Registro de jugadores para nueva partida
app.get('/', (req, res) => {
    res.render('inicio');
});

// Iniciar partida - Registrar/obtener jugadores
app.post('/iniciar-partida', (req, res) => {
    const { jugador1, jugador2 } = req.body;
    
    if (!jugador1 || !jugador2) {
        return res.status(400).send('Se requieren dos jugadores');
    }
    
    if (jugador1.toLowerCase() === jugador2.toLowerCase()) {
        return res.status(400).send('Los jugadores deben tener nombres diferentes');
    }

    // Insertar o obtener jugador 1
    const queryJ1 = `INSERT INTO jugadores (nombre) VALUES (?) 
                     ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id)`;
    
    bd.query(queryJ1, [jugador1], (error, result1) => {
        if (error) {
            console.log('Error al registrar jugador 1:', error);
            return res.status(500).send('Error al registrar jugador');
        }
        
        const jugador1Id = result1.insertId;
        
        // Insertar o obtener jugador 2
        bd.query(queryJ1, [jugador2], (error, result2) => {
            if (error) {
                console.log('Error al registrar jugador 2:', error);
                return res.status(500).send('Error al registrar jugador');
            }
            
            const jugador2Id = result2.insertId;
            
            // Obtener nombres actualizados
            const queryNombres = `SELECT id, nombre FROM jugadores WHERE id IN (?, ?)`;
            bd.query(queryNombres, [jugador1Id, jugador2Id], (error, jugadores) => {
                if (error) {
                    console.log('Error al obtener jugadores:', error);
                    return res.status(500).send('Error al obtener jugadores');
                }
                
                res.redirect(`/juego?j1=${jugador1Id}&j2=${jugador2Id}&n1=${encodeURIComponent(jugadores.find(j => j.id === jugador1Id)?.nombre || jugador1)}&n2=${encodeURIComponent(jugadores.find(j => j.id === jugador2Id)?.nombre || jugador2)}`);
            });
        });
    });
});

// Página del juego
app.get('/juego', (req, res) => {
    const { j1, j2, n1, n2 } = req.query;
    
    if (!j1 || !j2 || !n1 || !n2) {
        return res.redirect('/');
    }
    
    res.render('juego', {
        jugador1Id: j1,
        jugador2Id: j2,
        jugador1Nombre: decodeURIComponent(n1),
        jugador2Nombre: decodeURIComponent(n2)
    });
});

// Guardar resultado de partida
app.post('/guardar-resultado', (req, res) => {
    const { jugador1Id, jugador2Id, ganadorId, empate } = req.body;
    
    const esEmpate = empate === 'true' || empate === true;
    
    // Insertar partida
    const queryPartida = `INSERT INTO partidas (jugador1_id, jugador2_id, ganador_id, empate) 
                          VALUES (?, ?, ?, ?)`;
    
    bd.query(queryPartida, [jugador1Id, jugador2Id, esEmpate ? null : ganadorId, esEmpate], (error) => {
        if (error) {
            console.log('Error al guardar partida:', error);
            return res.status(500).json({ success: false, error: 'Error al guardar partida' });
        }
        
        if (esEmpate) {
            // Actualizar empates para ambos jugadores
            const queryEmpate = `UPDATE jugadores SET empates = empates + 1 WHERE id IN (?, ?)`;
            bd.query(queryEmpate, [jugador1Id, jugador2Id], (error) => {
                if (error) {
                    console.log('Error al actualizar empates:', error);
                }
                res.json({ success: true, message: 'Partida guardada - Empate' });
            });
        } else {
            // Actualizar victoria del ganador
            const queryVictoria = `UPDATE jugadores SET victorias = victorias + 1 WHERE id = ?`;
            bd.query(queryVictoria, [ganadorId], (error) => {
                if (error) {
                    console.log('Error al actualizar victoria:', error);
                }
                
                // Actualizar derrota del perdedor
                const perdedorId = ganadorId == jugador1Id ? jugador2Id : jugador1Id;
                const queryDerrota = `UPDATE jugadores SET derrotas = derrotas + 1 WHERE id = ?`;
                bd.query(queryDerrota, [perdedorId], (error) => {
                    if (error) {
                        console.log('Error al actualizar derrota:', error);
                    }
                    res.json({ success: true, message: 'Partida guardada' });
                });
            });
        }
    });
});

// Historial de puntuaciones
app.get('/historial', (req, res) => {
    const queryJugadores = `SELECT * FROM jugadores ORDER BY victorias DESC, empates DESC, derrotas ASC`;
    
    bd.query(queryJugadores, (error, jugadores) => {
        if (error) {
            console.log('Error al obtener historial:', error);
            return res.status(500).send('Error al obtener historial');
        }
        
        const queryPartidas = `
            SELECT p.*, 
                   j1.nombre as jugador1_nombre, 
                   j2.nombre as jugador2_nombre,
                   g.nombre as ganador_nombre
            FROM partidas p
            JOIN jugadores j1 ON p.jugador1_id = j1.id
            JOIN jugadores j2 ON p.jugador2_id = j2.id
            LEFT JOIN jugadores g ON p.ganador_id = g.id
            ORDER BY p.fecha_partida DESC
            LIMIT 20
        `;
        
        bd.query(queryPartidas, (error, partidas) => {
            if (error) {
                console.log('Error al obtener partidas:', error);
                partidas = [];
            }
            
            res.render('historial', { jugadores, partidas });
        });
    });
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`🎮 Gato de Gatos corriendo en http://localhost:${port}`);
});
