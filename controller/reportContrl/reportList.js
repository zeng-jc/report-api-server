// 存储报修信息
const dbconfig = require("../../util/dbconfig");

// 报修列表
module.exports = function (req, res) {
  const u_phone = req.query.u_phone;
  // 不是电话号码则直接 return
  if (!/^1[3456789]\d{9}$/.test(Number(u_phone))) return;
  let sql = "select * from rp_data where u_phone = " + u_phone;
  let sqlArr = [];
  let callBack = (err, data) => {
    if (err) {
      console.log("数据查询失败");
    } else {
      res.sendResult({ list: data }, 200, "报修记录查询成功");
    }
  };

  dbconfig.sqlConnect(sql, sqlArr, callBack);
};
