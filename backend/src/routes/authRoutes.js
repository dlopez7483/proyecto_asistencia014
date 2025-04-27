const express = require('express');
const router = express.Router();
const { login, logout } = require('../controllers/authController');
const { marcar_entrada } = require('../controllers/auxiliar/marcar_entrada_real');
const { marcar_salida } = require('../controllers/auxiliar/marcar_salida_real');
const  configuracionController  = require('../controllers/status_schedules');
const configSalidas = require('../controllers/status_salidas');


// Ruta para login
router.post('/login', login);
router.post('/logout', logout);


router.post('/marcar_entrada', marcar_entrada);
router.post('/marcar_salida', marcar_salida);

//const { registerAuxiliar } = require('../controllers/admin/register');
//router.post('/register', registerAuxiliar);//esto es para el admin, esto es una prueba

router.get('/obtener_estado_periodo_horarios', configuracionController.obtenerEstadoPeriodoHorarios);
router.get('/obtener_estado_salidas_extemporaneas', configSalidas.obtenerEstadoSalidas);


module.exports = router;
