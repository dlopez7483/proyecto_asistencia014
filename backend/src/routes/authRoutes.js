const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController');

// Ruta para login
router.post('/login', login);
//router.post('/register', registerAuxiliar);//esto es para el admin, esto es una prueba

module.exports = router;
