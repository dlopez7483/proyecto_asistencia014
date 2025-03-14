const mysql = require('mysql2/promise');
const config = require('../../config/config');
const now = new Date();

exports.marcar_entrada = async (req, res) => {
    const { rfid } = req.body;
    const fecha = now.toISOString().slice(0, 19).replace('T', ' ');
    res.status(200).json({ mensaje: 'Entrada marcada exitosamente', fecha });
}