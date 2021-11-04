// 存储报修信息
const db = require("../../config/db");

// 报修列表
module.exports = function (req, res) {
  let sql = "select * from rp_address";
  let callBack = (err, data) => {
    if (err) {
      console.log("报修地址获取失败", err);
      return res.sendResult(null, 500, "报修地址获取失败");
    }

    res.sendResult(data, 200, "报修记录查询成功");
  };

  db.query(sql, [], callBack);
};
