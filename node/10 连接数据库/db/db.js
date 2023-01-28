// 安装mysql: npm i mysql -S

const mysql = require('mysql');

// 数据库链接的基本配置
let pool = mysql.createPool({
    // 该账号为一般账号, 仅作测试用, 本人学生一枚, 请勿恶意修改与攻击

    // mysql连接地址, 如果是本地mysql一般默认为localhost:3306
    host: 'rm-bp10l6tput5rz9y0tjo.mysql.rds.aliyuncs.com',

    // 登录用户
    user: '',

    // 用户密码
    password: '',

    // 连接数据库名称
    database: '',
});

// 对数据库增删改查的基础
function myQuery(sql, callback) {

    // 连接数据库
    pool.getConnection(function (err, connection) {
        connection.query(sql, function (err, rows) {
            callback(err, rows);
            connection.release();
        })
    })
};


exports.myQuery = myQuery;