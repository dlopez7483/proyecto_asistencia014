const mysql = require('mysql2/promise')
const config = require('./config')

require('dotenv').config();

const mysqlPool = mysql.createPool(config.db)

module.exports = mysqlPool;
