// 存储报修信息
const dbconfig = require("../../util/dbconfig.js");

// 验证身份中间件
module.exports = function (req, res, next) {
  if (req.headers.authorization === undefined || req.headers.authorization === null) {
    return res.sendResult(null, 422, "缺少token");
  }
  let token = req.headers.authorization.split(" ");
  const mg_id = token[1].split(".")[0];
  const mg_name = token[1].split(".")[1];

  let sql = `select * from rp_manager where mg_id = ${mg_id} and mg_name = '${mg_name}'`;
  let sqlArr = [];
  let callBack = (err, data) => {
    if (err) {
      console.log("用户查询失败", err);
      res.sendResult(null, 500, "系统故障");
    } else {
      if (data.length === 0) return res.sendResult(data, 422, "登录失败，token错误");
      if (Number(data[0].mg_state) === 0) return res.sendResult(data, 422, "登录失败，当前管理员已被禁用");
      next();
    }
  };
  dbconfig.sqlConnect(sql, sqlArr, callBack);
};
