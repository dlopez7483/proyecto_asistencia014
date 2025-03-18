const mysql = require('mysql2/promise');
const config = require('../../config/config');
const bcrypt = require('bcryptjs');



exports.edit_aux = async (req, res) => {
    const carne = req.params.id;
    console.log(req.body)
    const { nombre, apellido, telefono, contrasenia, codigo_rfid, id_rol, carne_nuevo } = req.body;
    
    try {
        const connection = await mysql.createConnection(config.db);
        

        const fields = [];
        const values = [];
    
        if (nombre) {
            fields.push("Nombre = ?");
            values.push(nombre);
        }
        if (apellido) {
            fields.push("Apellido = ?");
            values.push(apellido);
        }
        if (telefono) {
            fields.push("Telefono = ?");
            values.push(telefono);
        }
        if (contrasenia) {
            const hashedPassword = await bcrypt.hash(contrasenia, 10);
            fields.push("Contrasenia = ?");
            values.push(hashedPassword);
        }
        if (codigo_rfid !== undefined) { 
            fields.push("Codigo_RFID = ?");
            values.push(codigo_rfid || null);
        }
        if (id_rol) {
            fields.push("Id_rol = ?");
            values.push(id_rol);
        }
        if (carne_nuevo) {
            fields.push("Carne = ?");
            values.push(carne_nuevo);
        }
    

        if (fields.length === 0) {
            return res.status(400).json({ mensaje: "No se proporcionaron datos para actualizar" });
        }
   
        const query = `UPDATE Auxiliar SET ${fields.join(", ")} WHERE Id_auxiliar = ?`;
        values.push(carne);
    

        await connection.execute(query, values);
        
        console.log("Usuario actualizado exitosamente");
        res.status(200).json({ mensaje: "Usuario actualizado exitosamente" });
    
    } catch (error) {
        console.error("Error en la actualización:", error);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
    


}