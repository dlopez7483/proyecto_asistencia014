const express = require('express');
const router = express.Router();
const { adminRequired, auxiliarRequired } = require('../middlewares/authMiddleware');
const { registerAuxiliar } = require('../controllers/admin/register');
const  configuracionController  = require('../controllers/admin/config_schedules')
//aca estaran todas las rutas de los auxiliares y administradores

router.post('/admin/register', adminRequired, registerAuxiliar);//funciona

router.post('/habilitar_periodo_horarios/admin',adminRequired, configuracionController.habilitarPeriodoHorarios);
router.post('/deshabilitar_periodo_horarios/admin', adminRequired, configuracionController.deshabilitarPeriodoHorarios);
//router.get('/verificar_estado_periodo_horarios', configuracionController.verificarEstadoPeriodoHorarios);

// router.get('/auxiliar', auxiliarRequired, (req, res) => {
//     res.status(200).json({ mensaje: 'Bienvenido, eres un auxiliar' });
// });

module.exports = router;
