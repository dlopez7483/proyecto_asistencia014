const mysql = require('mysql2/promise');
const config = require('../../config/config');

exports.resetSchedules = async (req, res) => {
    try {
        // Crear conexión a la base de datos
        const connection = await mysql.createConnection(config.db);

        // Obtener el Id_auxiliar basado en el carne
        const queryGetId = `TRUNCATE TABLE Horario;`;
        

        console.log('Auxiliar eliminado exitosamente');
        res.status(200).json({ mensaje: 'Auxiliar eliminado exitosamente' });

    } catch (error) {
        console.error('Error en la eliminación:', error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
};