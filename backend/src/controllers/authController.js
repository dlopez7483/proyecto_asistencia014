const mysql = require('mysql2/promise');
 const config = require('../config/config');
 const bcrypt = require('bcryptjs');
 const jwt = require('jsonwebtoken');
 const { generateToken } = require('../utils/jwtUtils')
 const JWT_SECRET = process.env.JWT_SECRET;
 
 exports.login = async (req, res) => {
     const { carne, contrasena, rol } = req.body;
 
     if (!carne || !contrasena || !rol) {
         return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
     }
 
     try {
         const connection = await mysql.createConnection(config.db);
         let query = '';
         let params = [];
 
         if (rol == '1' || rol == 'admin') {
             query = 'SELECT * FROM Auxiliar WHERE Carne = ? AND Id_rol = ?';
             params = [carne, rol];
         } else if (rol == '2' || rol == 'auxiliar') {
             query = 'SELECT * FROM Auxiliar WHERE Carne = ? AND Id_rol = ?';
             params = [carne, rol];
         } else {
             return res.status(400).json({ mensaje: 'Rol no válido' });
         }
         const [results] = await connection.execute(query, params);
         await connection.end();
         if (results.length > 0) {
             const auxiliar = results[0];
             const isPasswordValid = await bcrypt.compare(contrasena, auxiliar.Contrasenia);
             // auxiliar tiene todos los datos de la tabla
             if (isPasswordValid) {
                 const token = generateToken(auxiliar);
                 res.status(200).json({ mensaje: 'Bienvenido', token });
             } else {
                 res.status(401).json({ mensaje: 'Contraseña incorrecta' });
             }
         } else {
             res.status(401).json({ mensaje: 'Usuario o rol incorrectos' });
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
