// 存储报修信息
const dbconfig = require("../../util/dbconfig.js");

module.exports = function (req, res) {
  const u_phone = req.query.u_phone;
  let sql = `select * from rp_record where ${u_phone}`;
  let sqlArr = [];
  let callBack = (err, data) => {
    if (err) {
      console.log("报修记录查询失败", err);
      res.sendResult(null, 500, "系统故障");
    } else {
      res.sendResult(data, 200, "查询成功");
    }
  };
  dbconfig.sqlConnect(sql, sqlArr, callBack);
};
