const mysql = require('mysql2/promise');
const config = require('../../config/config');

exports.resetSchedules = async (req, res) => {
    let connection;
    try {
        // Crear conexión a la base de datos
        connection = await mysql.createConnection(config.db);

        // Ejecutar la consulta para truncar la tabla
        await connection.execute(`TRUNCATE TABLE Horario;`);

        console.log('Tabla Horario reseteada exitosamente');
        res.status(200).json({ mensaje: 'Tabla Horario reseteada exitosamente' });

    } catch (error) {
        console.error('Error al resetear la tabla Horario:', error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    } finally {
        // Cerrar la conexión si fue creada
        if (connection) {
            await connection.end();
        }
    }
};
