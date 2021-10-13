// 存储报修信息
const dbconfig = require("../util/dbconfig");
const fs = require("fs");
const path = require("path");
const multiparty = require("multiparty");

// 用户提交报修
function addReport(req, res) {
  //接收前台POST过来的base64
  let imgData = req.body.pic;
  // 生成multiparty对象，并配置上传目标路径
  let form = new multiparty.Form();
  // 设置编码
  form.encoding = "utf-8";
  // 设置文件存储路径，以当前编辑的文件为相对路径
  form.uploadDir = "../imgStorage/";
  form.parse(imgData, function (err, fields, files) {
    try {
      let inputFile = files.file[0];
      let newPath = form.uploadDir + "/" + inputFile.originalFilename; //oldPath  不得作更改，使用默认上传路径就好
      // 同步重命名文件名 fs.renameSync(oldPath, newPath)
      fs.renameSync(inputFile.path, newPath);
      res.send({ data: "上传成功！" });
    } catch (err) {
      console.log(err);
      res.send({ err: "上传失败！" });
    }
  });

  // let sql = "select * from rp_data";
  // let sqlArr = [];
  // let callBack = (err, data) => {
  //   if (err) {
  //     console.log("数据库连接出错");
  //   } else {
  //     res.send({ list: data });
  //   }
  // };
  // dbconfig.sqlConnect(sql, sqlArr, callBack);
}

// 报修列表
function reportList(req, res) {
  console.log("这是get请求");
  let sql = "select * from rp_data";
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
