const mysqlPool = require('../../config/conexion');

exports.resetSchedules = async (req, res) => {
    try {
        // Eliminar registros en orden correcto
        await mysqlPool.execute(`SET FOREIGN_KEY_CHECKS = 0;`);
        await mysqlPool.execute(`TRUNCATE TABLE Asistencia_Entrada;`);
        await mysqlPool.execute(`TRUNCATE TABLE Asistencia_Salida;`);
        await mysqlPool.execute(`TRUNCATE TABLE Auxiliar_Horario;`);
        await mysqlPool.execute(`TRUNCATE TABLE Horario;`);
        await mysqlPool.execute(`SET FOREIGN_KEY_CHECKS = 1;`);

        // Reiniciar el auto_increment de la tabla Horario
        await mysqlPool.execute(`ALTER TABLE Horario AUTO_INCREMENT = 1;`);

        console.log('Tabla Horario reseteada exitosamente');
        res.status(200).json({ mensaje: 'Tabla Horario reseteada exitosamente' });

    } catch (error) {
        console.error('Error al resetear la tabla Horario:', error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
};
