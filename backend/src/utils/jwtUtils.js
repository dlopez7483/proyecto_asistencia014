const jwt = require('jsonwebtoken');

// Clave secreta que se utiliza para firmar el token
const SECRET_KEY = process.env.JWT_SECRET;

// Función para generar el token JWT
const generateToken = (user) => {
    const payload = {
        id_usuario: user.Id_auxiliar,
        id_rol: user.Id_rol,  // O el campo que indique el rol
        carne: user.Carne,        // Si es necesario
    };

    // Generar el token con un tiempo de expiración de 1 hora
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
};

// Función para verificar el token JWT
const verifyToken = (token) => {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        throw new Error('Token inválido o expirado');
    }
};

module.exports = { generateToken, verifyToken };
