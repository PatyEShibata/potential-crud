const mysql = require('mysql')

const mysqlConnection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'crud-gazin',
    multipleStatements: true
})

mysqlConnection.connect((err) => {
    if (err) {
        console.log(' failed connection', err)
    } else {
        console.log(' success connection')

    }
})

module.exports = mysqlConnection