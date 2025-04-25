const express = require('express');
const router = express.Router();
const { adminRequired, auxiliarRequired } = require('../middlewares/authMiddleware');
//rutas del administrador
const { registerAuxiliar } = require('../controllers/admin/register');
const  configuracionController  = require('../controllers/admin/config_schedules')
const  {obtenerHorariosAuxiliar} = require('../controllers/admin/get_schedules')
const { editarHorario } = require('../controllers/admin/edit_schedules');
const { reporteHorasFaltantes } = require('../controllers/admin/reports/missing_hours');
const { edit_aux } = require('../controllers/auxiliar/edit_aux');
const { deleteAuxiliar } = require('../controllers/admin/delete');
const { resetSchedules } = require('../controllers/admin/reset_schedules');
const { obtenerTodosLosAuxiliares } = require('../controllers/admin/getInfoAuxiliares');//para obtener todos los auxiliares
const { searchAuxiliar } = require('../controllers/admin/getInfoAuxiliares');//para obtener un solo auxiliar
const { getAllSchedules } = require('../controllers/admin/getAllSchedules');//para obtener todos los horarios
const { crear_horario } = require('../controllers/admin/crear_horario');//para crear horarios
//rutas de los auxiliares
const { agregarHorarioPracticante } = require('../controllers/auxiliar/auxiliar_schedules')
const { delete_horario } = require('../controllers/auxiliar/delete_schedules');
const { obtenerHorariosAuxiliarPersonal } = require('../controllers/auxiliar/get_schedules_aux');
const { reporte_global_horas} = require('../controllers/admin/reporte_global_horas');
const { reporte_horas_individual } = require('../controllers/auxiliar/reporte_horas_individual');
const { searchAuxiliarAux } = require('../controllers/auxiliar/getinfoAux');//para obtener un solo auxiliar
//aca estaran todas las rutas de los auxiliares y administradores

router.get('/admin/reporte_global_horas',adminRequired,reporte_global_horas);
router.post('/admin/crear_horario', adminRequired, crear_horario);//funciona
router.post('/admin/register', adminRequired, registerAuxiliar);//funciona
router.post('/habilitar_periodo_horarios/admin',adminRequired, configuracionController.habilitarPeriodoHorarios);
router.post('/deshabilitar_periodo_horarios/admin', adminRequired, configuracionController.deshabilitarPeriodoHorarios);
router.get('/horarios_auxiliar/admin/:carne', adminRequired, obtenerHorariosAuxiliar);
router.put('/editar_horario/admin/:carne/:id_horario', adminRequired, editarHorario);
router.get('/horas_faltantes/admin', adminRequired, reporteHorasFaltantes);
router.delete('/eliminar_practicante/admin/:carne', adminRequired, deleteAuxiliar);
router.put('/Editar_practicante/:id',adminRequired, edit_aux);
router.get('resetear_horarios/admin', adminRequired, resetSchedules);
router.get('/getAllAuxiliares/admin', adminRequired, obtenerTodosLosAuxiliares);
router.get('/getInfoAux/admin/:carne', adminRequired, searchAuxiliar);
router.get('/admin/getAllSchedules',adminRequired,getAllSchedules);

//router.get('/verificar_estado_periodo_horarios', configuracionController.verificarEstadoPeriodoHorarios);

// router.get('/auxiliar', auxiliarRequired, (req, res) => {
//     res.status(200).json({ mensaje: 'Bienvenido, eres un auxiliar' });
// });

router.post('/aux/agregarHorario', auxiliarRequired, agregarHorarioPracticante);
router.delete('/aux/eliminarHorario/:Id_horario', delete_horario);
router.get('/aux/horarios_auxiliar',auxiliarRequired, obtenerHorariosAuxiliarPersonal);
router.get('/aux/reporte_horas_individual',auxiliarRequired,reporte_horas_individual);
router.put('/editar_perfil/:id',auxiliarRequired, edit_aux);
router.get('/getInfo/:carne',auxiliarRequired, searchAuxiliarAux)

module.exports = router;
