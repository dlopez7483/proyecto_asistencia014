
require('dotenv').config();
const config = {
    db: {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER  || 'root'  ,
        password: process.env.DB_PASSWORD || 'contra123',
        port: process.env.DB_PORT || 3306,
        database: process.env.DB_NAME || 'SA_P2'
    }


}


module.exports = config;