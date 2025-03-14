const express = require('express');
const app = express();
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const { verifyToken } = require('./middlewares/authMiddleware');



app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes); //cualquier usuario puede usar el login

// Rutas protegidas (requieren JWT)
app.use('/user', verifyToken, userRoutes);



// Manejo de errores
app.use((req, res, next) => {
    res.status(404).json({ mensaje: 'Ruta no encontrada' });
});


module.exports = app;