const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost', // 호스트 이름, 포트는 자동구성
    database: 'blog', // mysql에서 database이름
    user: 'root',
    password: 'wl2gns3!@#'
});

module.exports = pool;