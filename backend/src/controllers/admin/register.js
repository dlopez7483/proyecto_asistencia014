const bcrypt = require('bcryptjs'); // Asegúrate de tener bcryptjs instalado
const mysqlPool = require('../../config/conexion');

exports.registerAuxiliar = async (req, res) => {
    const { nombre, apellido, carne, telefono, contrasenia, codigo_rfid, id_rol } = req.body;
    if (!carne || !contrasenia || !id_rol) {
        return res.status(400).json({ mensaje: 'Todos los campos obligatorios deben ser llenados' });
    }
    try {
        const hashedPassword = await bcrypt.hash(contrasenia, 10);
        const query = `
            INSERT INTO Auxiliar (Nombre, Apellido, Carne, Telefono, Contrasenia, Codigo_RFID, Id_rol)
            VALUES (?, ?, ?, ?, ?, ?, ?);
        `;
        // Ejecutar la consulta usando mysqlPool.execute (mysql2 utiliza execute para consultas preparadas)
        await mysqlPool.execute(query, [nombre, apellido, carne, telefono, hashedPassword, codigo_rfid || null, id_rol]);
        
        // Aquí puedes manejar la respuesta después de la inserción
        console.log('Usuario registrado exitosamente');
        res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        return res.status(500).json({ mensaje: 'Error al registrar el usuario' });
    }
};
