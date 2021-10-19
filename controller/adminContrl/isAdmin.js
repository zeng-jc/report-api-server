// 存储报修信息
const dbconfig = require("../../util/dbconfig.js");
// token
const jwt = require("jsonwebtoken");
// 加密规则
const { secret } = require("../../config/tokenSecret.js");

// 验证身份中间件
module.exports = function (req, res, next) {
  if (req.headers.authorization === undefined || req.headers.authorization === null) {
    return res.sendResult(null, 422, "缺少token");
  }
  // 1.拿到最后一个元素，也就是token
  let token = req.headers.authorization.split(" ").pop();
  // 2.判断token是否有效
  try {
    let tokenObj = jwt.verify(token, secret);
  } catch (error) {
    return res.sendResult(null, 422, "token无效");
  }
  // 3.对token进行解密
  let tokenObj = jwt.verify(token, secret);

  const { mg_id, mg_name } = tokenObj;
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
