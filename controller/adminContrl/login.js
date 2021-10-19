// 存储报修信息
const dbconfig = require("../../util/dbconfig.js");
// token
let jwt = require("jsonwebtoken");

function login(req, res, next) {
  const { username, password } = req.body;
  let sql = `select mg_id,mg_name,mg_pwd from rp_manager where mg_name='${username}' and mg_pwd='${password}'`;
  let sqlArr = [];
  let callBack = (err, data) => {
    if (err) {
      console.log("用户查询失败", err);
      res.sendResult(null, 500, "系统故障");
    } else {
      if (data.length === 0) return res.sendResult(data, 422, "登录失败，账号或密码错误");
      const token = data[0].mg_id + "." + data[0].mg_name;
      res.sendResult({ token }, 200, "管理员登录成功");
    }
  };
  dbconfig.sqlConnect(sql, sqlArr, callBack);
}

// function verify(req, res, next) {
//   let token = req.headers.authorization.split(" ");
//   const mg_id = token[1].split(".")[0];
//   const mg_name = token[1].split(".")[1];

//   let sql = `select * from rp_manager where mg_id = ${mg_id} and mg_name = '${mg_name}'`;
//   let sqlArr = [];
//   let callBack = (err, data) => {
//     if (err) {
//       console.log("用户查询失败", err);
//       res.sendResult(null, 500, "系统故障");
//     } else {
//       if (data.length === 0) return res.sendResult(data, 422, "登录失败，token错误");
//       if (Number(data[0].mg_state) === 0) return res.sendResult(data, 422, "登录失败，当前管理员已被禁用");
//       res.sendResult(null, 200, "登录成功");
//     }
//   };
//   dbconfig.sqlConnect(sql, sqlArr, callBack);
// }

module.exports = { login };
