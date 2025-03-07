const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController');
const  configuracionController  = require('../controllers/status_schedules');

// Ruta para login
router.post('/login', login);
//router.post('/register', registerAuxiliar);//esto es para el admin, esto es una prueba

router.get('/verificar_estado_periodo_horarios', configuracionController.verificarEstadoPeriodoHorarios);


module.exports = router;
