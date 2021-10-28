let mysql = require("mysql");

// 创建 mysql 连接池资源
let pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123",
  database: "report",
  acquireTimeout: 15000, // 连接超时时间
  connectionLimit: 100, // 最大连接数
  waitForConnections: true, // 超过最大连接时排队
  queueLimit: 0, // 排队最大数量(0 代表不做限制)
});

exports.query = function (sql, sqlArr, callback) {
  new Promise(function (resolve, reject) {
    //建立链接
    pool.getConnection(function (err, connection) {
      if (err) {
        return reject(err); // not connected!
      }
      connection.query(sql, sqlArr, function (err, results) {
        //每次查询 回调
        callback(err, results);
        //将链接返回到连接池中，准备由其他人重复使用
        connection.release();
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  });
};
