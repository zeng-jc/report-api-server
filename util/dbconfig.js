const mysql = require("mysql");

// 数据库配置
module.exports = {
  config: {
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
        console.log("数据查询失败");
        return;
      }
      console.log("数据查询成功");
      // 事件驱动回调
      conn.query(sql, sqlArr, callBack);
      // 释放连接
      conn.release();
    });
  },
};
