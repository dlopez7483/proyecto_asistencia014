const express = require('express');
const router = express.Router();
const { adminRequired, auxiliarRequired } = require('../middlewares/authMiddleware');
const { registerAuxiliar } = require('../controllers/admin/register');

//aca estaran todas las rutas de los auxiliares y administradores

router.post('/admin/register', adminRequired, registerAuxiliar);

// router.get('/auxiliar', auxiliarRequired, (req, res) => {
//     res.status(200).json({ mensaje: 'Bienvenido, eres un auxiliar' });
// });

module.exports = router;
