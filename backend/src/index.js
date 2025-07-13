require('dotenv').config();
const app = require('./app');

const PORT = process.env.SERVER_PORT;

const httpServer = app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

function doGracefulShutdown(signal) {
    console.log(`Señal '${signal}' recibida. Terminando proceso...`);

    if (httpServer) {
        httpServer.close(() => {
            console.log('Proceso terminado correctamente.');
            process.exit(0);
        });
    }
    else {
        console.log('Proceso terminado correctamente.');
        process.exit(0);
    }

    setTimeout(() => {
        console.error('Proceso terminado forzosamente.');
        process.exit(0);
    }, 5000);
}

process.on('SIGINT', () => doGracefulShutdown('SIGINT'));
process.on('SIGTERM', () => doGracefulShutdown('SIGTERM'));
