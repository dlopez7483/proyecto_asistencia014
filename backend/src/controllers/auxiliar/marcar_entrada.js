const mysql = require('mysql2/promise');
const config = require('../../config/config');
const now = new Date();



exports.marcar_entrada = async (req, res) => {
    const { rfid } = req.body;
    
    try {
        const connection = await mysql.createConnection(config.db);
        const fecha = new Date();

        // Obtener el día de la semana en texto
        const diasSemana = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
        const diaSemana = diasSemana[fecha.getDay()];
        
        // Obtener la hora y los minutos con formato de dos dígitos
        const horas = fecha.getHours().toString().padStart(2, '0');
        const minutos = fecha.getMinutes().toString().padStart(2, '0');
        
        // Imprimir el resultado
        console.log(`Hoy es ${diaSemana}, la hora actual es ${horas}:${minutos}`);
        
        console.log(rfid);
        console.log(fecha.getDate());
        res.status(200).json({ mensaje: "Entrada marcada" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al conectar a la base de datos" });
    }  

}