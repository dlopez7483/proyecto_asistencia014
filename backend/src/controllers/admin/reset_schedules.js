const mysql = require('mysql2/promise');
const config = require('../../config/config');

exports.resetSchedules = async (req, res) => {
    let connection;
    try {
        connection = await mysql.createConnection(config.db);

        // Eliminar registros en orden correcto
        await connection.execute(`SET FOREIGN_KEY_CHECKS = 0;`);
        await connection.execute(`TRUNCATE TABLE Asistencia_Entrada;`);
        await connection.execute(`TRUNCATE TABLE Asistencia_Salida;`);
        await connection.execute(`TRUNCATE TABLE Auxiliar_Horario;`);
        await connection.execute(`TRUNCATE TABLE Horario;`);
        await connection.execute(`SET FOREIGN_KEY_CHECKS = 1;`);

        // Reiniciar el auto_increment de la tabla Horario
        await connection.execute(`ALTER TABLE Horario AUTO_INCREMENT = 1;`);

        console.log('Tabla Horario reseteada exitosamente');
        await connection.end();
        res.status(200).json({ mensaje: 'Tabla Horario reseteada exitosamente' });

    } catch (error) {
        console.error('Error al resetear la tabla Horario:', error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
};
