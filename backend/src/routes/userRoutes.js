const express = require('express');
const router = express.Router();
const { adminRequired, auxiliarRequired } = require('../middlewares/authMiddleware');
//rutas del administrador
const { registerAuxiliar } = require('../controllers/admin/register');
const  configuracionController  = require('../controllers/admin/config_schedules')
const  {obtenerHorariosAuxiliar} = require('../controllers/admin/get_schedules')
const { editarHorario } = require('../controllers/admin/edit_schedules');


//rutas de los auxiliares
const { agregarHorarioPracticante } = require('../controllers/auxiliar/auxiliar_schedules')
const { obtenerHorariosAuxiliarPersonal } = require('../controllers/auxiliar/get_schedules_aux'); 
//aca estaran todas las rutas de los auxiliares y administradores

router.post('/admin/register', adminRequired, registerAuxiliar);//funciona

router.post('/habilitar_periodo_horarios/admin',adminRequired, configuracionController.habilitarPeriodoHorarios);
router.post('/deshabilitar_periodo_horarios/admin', adminRequired, configuracionController.deshabilitarPeriodoHorarios);
router.get('/horarios_auxiliar/admin/:carne', adminRequired, obtenerHorariosAuxiliar);
router.put('/editar_horario/admin/:carne/:id_horario', adminRequired, editarHorario);

//router.get('/verificar_estado_periodo_horarios', configuracionController.verificarEstadoPeriodoHorarios);

// router.get('/auxiliar', auxiliarRequired, (req, res) => {
//     res.status(200).json({ mensaje: 'Bienvenido, eres un auxiliar' });
// });

router.post('/aux/agregarHorario', auxiliarRequired, agregarHorarioPracticante);
router.get('/aux/horarios_auxiliar',auxiliarRequired, obtenerHorariosAuxiliarPersonal);

module.exports = router;
