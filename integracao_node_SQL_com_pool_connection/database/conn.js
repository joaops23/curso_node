const mysql = require('mysql2')

const pool = mysql.createPool({
    connectionLimit: 10, // mantém no máximo 10 conexões ativas, as que estiverem além disso serão finalizadas
    host: '127.0.0.1',
    user: 'root',
    password: '1045',
    database: 'nodemysql2',
    port:'3306'
})

module.exports = pool