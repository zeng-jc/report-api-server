// 存储报修信息
const dbconfig = require("../../util/dbconfig.js");

// 获取报修记录
function record(req, res) {
  const query = req.query.query;
  const currentpage = Number(req.query.currentpage);
  const pagesize = Number(req.query.pagesize);
  if (!/^\d+$/.test(currentpage) || !currentpage >= 1 || !/^\d+$/.test(pagesize)) {
    return res.sendResult(null, 422, "参数有误");
  }
  // 偏移量
  const offset = (currentpage - 1) * pagesize;
  // 分页查询伪代码：sql： "select * from rp_record limit offset, pagesize";
  let sql;
  if (query === "" || query === null) {
    sql = "select *, count(*) over() as total from rp_record order by u_id desc limit " + offset + "," + pagesize;
  } else {
    sql = "select *, count(*) over() as total from rp_record order by u_id desc limit " + offset + "," + pagesize;
  }
  const sqlArr = [];
  const callback = (err, data) => {
    if (err) {
      console.log("报修记录查询失败", err);
      res.sendResult(null, 500, "系统故障");
    } else {
      let rData = {};
      rData.total = data[0].total;
      rData.currentpage = currentpage;
      rData.record = data;
      res.sendResult(rData, 200, "查询成功");
    }
  };
  dbconfig.sqlConnect(sql, sqlArr, callback);
}

// 删除报修记录
function deleteRecord(req, res) {
  const u_id = req.params.id;
  let sql = "delete from rp_record where u_id=" + u_id;
  const sqlArr = [];
  const callBack = (err, data) => {
    if (err) {
      console.log("删除失败", err);
      res.sendResult(null, 500, "系统故障");
    } else {
      res.sendResult(null, 200, "删除成功");
    }
  };
  dbconfig.sqlConnect(sql, sqlArr, callBack);
}

function searchRecord(req, res) {
  const u_phone = req.query.u_phone;
  let sql = `select * from rp_record where ${u_phone}`;
  const sqlArr = [];
  const callBack = (err, data) => {
    if (err) {
      console.log("报修记录查询失败", err);
      res.sendResult(null, 500, "系统故障");
    } else {
      res.sendResult(data, 200, "查询成功");
    }
  };
  dbconfig.sqlConnect(sql, sqlArr, callBack);
}

module.exports = {
  searchRecord,
  record,
  deleteRecord,
};
