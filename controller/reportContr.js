// 存储报修信息
const dbconfig = require("../util/dbconfig");
const fs = require("fs");
const path = require("path");

// 用户提交报修
function addReport(req, res) {
  //接收前台数据
  const u_name = req.body.u_name;
  const u_phone = req.body.u_phone;
  const u_identity = req.body.u_identity;
  const address = req.body.address;
  const d_address = req.body.d_address;
  const rp_describe = req.body.rp_describe;
  const rp_time = req.body.rp_time;
  const rp_state = req.body.rp_state;
  /**
   * 图片处理
   */
  let base64_arr = req.body.rp_pic;
  const img_arr = [];
  // 如果不是数组直接 return
  if (!Array.isArray(base64_arr)) return;
  for (const item of base64_arr) {
    console.log();
    //路径从app.js级开始找--
    let img_path = "./imgStorage/" + Date.now() + ".png";
    img_arr.push(img_path);
    //去掉图片base64码前面部分data:image/png;base64
    let base64 = (item.content + "").replace(/^data:image\/\w+;base64,/, "");
    //把 base64 码转成buffer对象
    let dataBuffer = new Buffer.from(base64, "base64");
    fs.writeFile(img_path, dataBuffer, function (err) {
      //用fs写入文件
      if (err) {
        console.log(err);
      } else {
        console.log("写入成功！");
      }
    });
  }

  let sql = `
  insert into rp_data
  (u_name, u_phone, u_identity, address, d_address, rp_pic, rp_describe, rp_time, rp_state) 
  values 
  ("${u_name}", "${u_phone}", "${u_identity}", "${address}", "${d_address}", 
  "${img_arr}", "${rp_describe}", "${rp_time}","${rp_state}")`;
  sql = sql.replace(/\n|\r/g, "");
  let sqlArr = [];
  let callBack = (err, data) => {
    if (err) {
      res.send("提交失败");
      console.log("数据库连接出错", err);
    } else {
      res.send("提交成功");
    }
  };
  dbconfig.sqlConnect(sql, sqlArr, callBack);
}

// 报修列表
function reportList(req, res) {
  const u_phone = req.query.u_phone;
  // 不是电话号码则直接 return
  if (!/^1[3456789]\d{9}$/.test(Number(u_phone))) return;
  let sql = "select * from rp_data where u_phone = " + u_phone;
  let sqlArr = [];
  let callBack = (err, data) => {
    if (err) {
      console.log("数据库连接出错");
    } else {
      res.send({ list: data });
    }
  };

  dbconfig.sqlConnect(sql, sqlArr, callBack);
}

// 用户查询报修记录

module.exports = {
  addReport,
  reportList,
};
