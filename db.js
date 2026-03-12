const mysql = require ("mysql2");
const pool = mysql.createPool({
    host:'localhost',
    user:'user',
    password:'',
    database:'livros',
});

const promisePool= pool.promise();

module.exports = promisePool;