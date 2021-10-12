// 存储报修信息
let dbconfig = require("../util/dbconfig");

function addReport(req, res) {
  let sql = "select * from student";
  let sqlArr = [];
  let callBack = (err, data) => {
    if (err) {
      console.log("数据库连接出错");
    } else {
      res.send({ list: data });
    }
  };

  console.log(JSON.stringify(req.body));

  dbconfig.sqlConnect(sql, sqlArr, callBack);
}

// 用户查询报修记录

module.exports = {
  addReport,
};
