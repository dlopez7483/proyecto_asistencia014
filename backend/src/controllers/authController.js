const mysql = require('mysql2/promise');
const config = require('../config/config');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/jwtUtils');

exports.login = async (req, res) => {
    const { carne, contrasena } = req.body;
    console.log(req.body);
    if (!carne || !contrasena) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    try {
        // Conectar a la base de datos
        const connection = await mysql.createConnection(config.db);
        
        // Buscar usuario por carné sin necesidad de que el frontend envíe el rol
        const query = 'SELECT * FROM Auxiliar WHERE Carne = ?';
        const [results] = await connection.execute(query, [carne]);
        await connection.end();

        if (results.length > 0) {
            const auxiliar = results[0];
            const isPasswordValid = await bcrypt.compare(contrasena, auxiliar.Contrasenia);

            if (isPasswordValid) {
                // Generar token con el rol obtenido de la BD
                const token = generateToken(auxiliar);
                res.status(200).json({ mensaje: 'Bienvenido', token });
            } else {
                res.status(401).json({ mensaje: 'Contraseña incorrecta' });
            }
        } else {
            res.status(401).json({ mensaje: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error('Error en el login:', error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
};

exports.logout = async (req, res) => {
    try {
        // El frontend solo debe eliminar el token del almacenamiento
        res.status(200).json({ mensaje: 'Logout exitoso' });
    } catch (error) {
        console.error('Error en el logout:', error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
};
