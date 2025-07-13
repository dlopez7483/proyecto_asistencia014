const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

// para verificar el token
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ mensaje: 'Acceso denegado, no se proporcionó un token' });
    }
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ mensaje: 'Token inválido o expirado' });
        }
        req.user = decoded;  // Decodificado con la información del usuario
        next();
    });
};

// Middleware para verificar si el rol es admin
const adminRequired = (req, res, next) => {
    if (req.user.id_rol !== 1) {
        return res.status(403).json({ mensaje: 'Acceso denegado. No eres administrador.' });
    }
    next();
};
// Middleware para verificar si el rol es auxiliar
const auxiliarRequired = (req, res, next) => {
    if (req.user.id_rol !== 2) {
        return res.status(403).json({ mensaje: 'Acceso denegado. No eres auxiliar.' });
    }
    next();
};
module.exports = { verifyToken, adminRequired, auxiliarRequired };
