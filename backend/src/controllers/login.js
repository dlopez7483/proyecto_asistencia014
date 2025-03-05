
const db = require('../db/conexion');
const config = require('../db/config')
const mysql = require('mysql2/promise')
exports.login = async (req, res) => {
    const {usuario, contrasena,rol} = req.body;
   try {
    const connection = await mysql.createConnection(config.db);
    if (rol === 'admin' || rol === 'maestro') {
        const [results,] = await connection.execute('SELECT * FROM Administrador WHERE nombre_usuario = ? AND contrasena = ? AND rol =?', [usuario, contrasena,rol]);
        connection.end(function (err) {
            console.log("Conexion cerrada")
            if (err) {
                return console.log("error conexion: ", err.message);
            }
            console.log("Conexion cerrada ");
        });
        connection.destroy()
        if (results.length > 0) {
            res.status(200).json({ mensaje: 'Bienvenido Administrador',results });
        } else {
            res.status(401).json({ mensaje: 'Usuario o contraseña incorrectos' });
        }
    }
    else if (rol === 'cliente') {
        const [results,] = await connection.execute('SELECT * FROM Cliente WHERE nombre_usuario = ? AND contrasena = ? AND rol=?', [usuario, contrasena,rol]);
        connection.end(function (err) {
            console.log("Conexion cerrada")
            if (err) {
                return console.log("error conexion: ", err.message);
            }
            console.log("Conexion cerrada ");
        });
        connection.destroy()
        if (results.length > 0) {
            res.status(200).json({ mensaje: 'Bienvenido Cliente',results });
        } else {
            res.status(401).json({ mensaje: 'Usuario o contraseña incorrectos' });
        }
    }
   }
   catch (error) {
    console.log(error)
    res.status(500).json({ mensaje: 'Error en el servidor' });
   }
}
