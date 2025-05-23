const mysqlPool = require('../../config/conexion');

exports.obtenerTodosLosAuxiliares = async (req, res) => { //aca se obtiene la info de todos los auxiliares
    try {
        const query = `
            SELECT Id_auxiliar, Nombre, Apellido, Carne, Telefono, Codigo_RFID, Id_rol
            FROM Auxiliar
            WHERE Id_rol = 2;
        `;
        const [auxiliares] = await mysqlPool.execute(query);
        res.status(200).json({
            auxiliares: auxiliares
        });
    } catch (error) {
        console.error('Error al obtener auxiliares:', error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
};


exports.searchAuxiliar = async (req, res) => { //aca se obtiene la informacion de un auxiliar/administrador
    try {
        const { carne } = req.params;
        if (!carne) {
            return res.status(400).json({ mensaje: 'Debes proporcionar el carné' });
        }
        const query = `
            SELECT Id_auxiliar, Nombre, Apellido, Carne, Telefono, Codigo_RFID, Id_rol
            FROM Auxiliar
            WHERE Carne = ?;
        `;
        const [auxiliares] = await mysqlPool.execute(query, [carne]);
        if (auxiliares.length === 0) {
            return res.status(404).json({ mensaje: 'No se encontró el auxiliar' });
        }
        res.status(200).json(auxiliares[0]);
    } catch (error) {
        console.error('Error al obtener auxiliar:', error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
};