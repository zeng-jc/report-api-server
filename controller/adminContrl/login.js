// 存储报修信息
const db = require("../../config/db.js");
// token
const jwt = require("jsonwebtoken");
// 加密规则
const { secret } = require("../../config/tokenSecret.js");

/**
 * 登录login
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function login(req, res, next) {
  const { username, password } = req.body;
  let sql = `select * from rp_manager where mg_name = ? and mg_pwd = ?`;
  let sqlArr = [username, password];
  let callBack = (err, data) => {
    if (err) {
      console.log("用户查询失败", err);
      return res.sendResult(null, 500, "系统故障");
    }

    if (data.length === 0) return res.sendResult(data, 422, "登录失败，账号或密码错误");
    // 1.从查询到的数据中拿到id和name
    const { mg_id, mg_name, mg_role } = data[0];
    // 2.返回token，并设置过期时间为1天
    const token = jwt.sign({ mg_id, mg_name }, secret, { expiresIn: 60 * 60 * 24 });
    if (Number(data[0].mg_role_id) !== 1) return res.sendResult({ token, mg_name, mg_role }, 200, "普通管理员");
    res.sendResult({ token, mg_name, mg_role }, 200, "超级管理员");
  };
  db.query(sql, sqlArr, callBack);
}

module.exports = { login };
