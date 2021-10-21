// 存储报修信息
const dbconfig = require("../../util/dbconfig");

// 报修列表
module.exports = function (req, res) {
  const u_mobile = req.query.u_mobile;
  // 不是电话号码则直接 return
  if (!/^1[3456789]\d{9}$/.test(Number(u_mobile))) return;
  let sql = "select * from rp_record where u_mobile = " + u_mobile + " order by u_id desc";
  let sqlArr = [];
  let callBack = (err, data) => {
    if (err) {
      console.log("数据查询失败", err);
    } else {
      res.sendResult({ list: data }, 200, "报修记录查询成功");
    }
  };

  dbconfig.sqlConnect(sql, sqlArr, callBack);
};
