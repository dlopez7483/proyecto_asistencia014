const mysqlPool = require('../../config/conexion');

exports.deleteAuxiliar = async (req, res) => {
    const { carne } = req.params;

    if (!carne) {
        return res.status(400).json({ mensaje: 'Es obligatorio el carne del auxiliar' });
    }


    try {
        // Obtener el Id_auxiliar basado en el carne
        const queryGetId = `SELECT Id_auxiliar FROM Auxiliar WHERE carne = ?;`;
        const [rows] = await mysqlPool.execute(queryGetId, [carne]);

        if (rows.length === 0) {
            return res.status(404).json({ mensaje: 'No se encontró un auxiliar con ese carne' });
        }

        const id_auxiliar = rows[0].Id_auxiliar;

        // Eliminar relaciones en auxiliar_horario
        await mysqlPool.execute(`DELETE FROM Auxiliar_Horario WHERE Id_auxiliar = ?;`, [id_auxiliar]);

        // Obtener todos los Id_horario relacionados con el auxiliar
        const queryGetHorario = `SELECT Id_horario FROM Auxiliar_Horario WHERE Id_auxiliar = ?;`;
        const [horarios] = await mysqlPool.execute(queryGetHorario, [id_auxiliar]);

        if (horarios.length > 0) {
            const idsHorario = horarios.map(h => h.Id_horario);
            const queryDeleteHorario = `DELETE FROM Horario WHERE Id_horario IN (${idsHorario.map(() => '?').join(',')});`;
            await mysqlPool.execute(queryDeleteHorario, idsHorario);
        }

        // Eliminar al auxiliar de la tabla `Auxiliar`
        const queryDeleteAuxiliar = `DELETE FROM Auxiliar WHERE Id_auxiliar = ?;`;
        const [result] = await mysqlPool.execute(queryDeleteAuxiliar, [id_auxiliar]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'No se encontró un auxiliar con ese carne' });
        }

        console.log('Auxiliar eliminado exitosamente');
        res.status(200).json({ mensaje: 'Auxiliar eliminado exitosamente' });

    } catch (error) {
        console.error('Error en la eliminación:', error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
};
