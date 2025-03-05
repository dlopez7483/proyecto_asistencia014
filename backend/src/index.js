require('dotenv').config();
const app = require('./app');
app.listen(app.get('port'));
console.log('Servidor en 5000', app.get('port'));
