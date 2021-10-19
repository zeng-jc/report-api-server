// 存储报修信息
const dbconfig = require("../../util/dbconfig.js");
// token
const jwt = require("jsonwebtoken");
// 加密规则
const { secret } = require("../../config/tokenSecret.js");

function login(req, res, next) {
  const { username, password } = req.body;
  let sql = `select * from rp_manager where mg_name='${username}' and mg_pwd='${password}'`;
  let sqlArr = [];
  let callBack = (err, data) => {
    if (err) {
      console.log("用户查询失败", err);
      res.sendResult(null, 500, "系统故障");
    } else {
      if (data.length === 0) return res.sendResult(data, 422, "登录失败，账号或密码错误");
      // 1.从查询到的数据中拿到id和name
      const { mg_id, mg_name } = data[0];
      // 2.返回token，并设置过期时间为1天
      const token = jwt.sign({ mg_id, mg_name }, secret, { expiresIn: 60 * 60 * 24 });
      res.sendResult({ token }, 200, "管理员登录成功");
    }
  };
  dbconfig.sqlConnect(sql, sqlArr, callBack);
}

module.exports = { login };
