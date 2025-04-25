const mysql = require('mysql2/promise');
const config = require('../../config/config');

exports.obtenerTodosLosAuxiliaresTutor = async (req, res) => { //aca se obtiene la info de todos los auxiliares
    try {
        const connection = await mysql.createConnection(config.db);
        const query = `
            SELECT Id_auxiliar, Nombre, Apellido, Carne, Telefono, Codigo_RFID, Id_rol
            FROM Auxiliar
            WHERE Id_rol = 2;
        `;
        const [auxiliares] = await connection.execute(query);
        await connection.end();
        res.status(200).json({
            auxiliares: auxiliares
        });
    } catch (error) {
        console.error('Error al obtener auxiliares:', error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
};


exports.searchAuxiliarAux = async (req, res) => { //aca se obtiene la informacion de un auxiliar/administrador
    try {
        const { carne } = req.params;
        if (!carne) {
            return res.status(400).json({ mensaje: 'Debes proporcionar el carné' });
        }
        const connection = await mysql.createConnection(config.db);
        const query = `
            SELECT Id_auxiliar, Nombre, Apellido, Carne, Telefono, Codigo_RFID, Id_rol
            FROM Auxiliar
            WHERE Carne = ?;
        `;
        const [auxiliares] = await connection.execute(query, [carne]);
        await connection.end();
        if (auxiliares.length === 0) {
            return res.status(404).json({ mensaje: 'No se encontró el auxiliar' });
        }
        res.status(200).json(auxiliares[0]);
    } catch (error) {
        console.error('Error al obtener auxiliar:', error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
};