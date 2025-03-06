const mysql = require('mysql2');
const bcrypt = require('bcryptjs'); // Asegúrate de tener bcryptjs instalado

// Crear la conexión a la base de datos
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

exports.registerAuxiliar = async (req, res) => {
    const { nombre, apellido, carne, telefono, contrasenia, codigo_rfid, id_rol } = req.body;
    if (!nombre || !apellido || !carne || !telefono || !contrasenia || !id_rol) {
        return res.status(400).json({ mensaje: 'Todos los campos obligatorios deben ser llenados' });
    }
    try {
        const hashedPassword = await bcrypt.hash(contrasenia, 10);
        const query = `
            INSERT INTO Auxiliar (Nombre, Apellido, Carne, Telefono, Contrasenia, Codigo_RFID, Id_rol)
            VALUES (?, ?, ?, ?, ?, ?, ?);
        `;
        // Ejecutar la consulta usando db.execute (mysql2 utiliza execute para consultas preparadas)
        await db.execute(query, [nombre, apellido, carne, telefono, hashedPassword, codigo_rfid || null, id_rol]);
        console.log('Usuario registrado exitosamente');
        res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error('Error en el registro:', error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
};
