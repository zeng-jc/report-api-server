const mysql = require("mysql");

// class MysqlPool {
//   constructor() {
//     this.flag = true;
//     this.pool = mysql.createPool({
//       host: "localhost",
//       port: "3306",
//       user: "root",
//       password: "123",
//       database: "report",
//       port: 3306,
//     });
//   }
//   getPool() {
//     if (this.flag) {
//       this.pool.on("connection", connection => {
//         connection.query("SET SESSION auto_increment_increment=1");
//         this.flag = false;
//       });
//     }
//     return this.pool;
//   }
// }

// module.exports = MysqlPool;

// 数据库配置
module.exports = {
  config: {
    connectionLimit: 10,
    host: "localhost",
    port: "3306",
    user: "root",
    password: "123",
    database: "report",
  },
  // 连接数据库，使用mysql连接池连接方式
  sqlConnect(sql, sqlArr, callBack) {
    let pool = mysql.createPool(this.config);
    pool.getConnection((err, conn) => {
      if (err) {
        console.log("连接失败", err);
        return;
      }
      // 事件驱动回调
      conn.query(sql, sqlArr, callBack);
      console.log("---------");
      // 释放连接
      conn.release();
    });
  },
};
