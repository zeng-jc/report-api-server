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
  // 偏移量。分页查询伪代码：sql： "select * from rp_record limit offset, pagesize";
  let offset = (currentpage - 1) * pagesize;
  // 1.先查询一共有多少条数据
  let totalSql = "select count(*) as count from rp_record;";
  const totalSqlArr = [];
  new Promise((resolve, reject) => {
    dbconfig.sqlConnect(totalSql, totalSqlArr, (err, data) => {
      if (err) {
        console.log("报修记录查询失败", err);
        res.sendResult(null, 500, "系统故障");
      } else {
        resolve(data[0].count);
      }
    });
  }).then(totalCount => {
    if (totalCount + pagesize <= currentpage * pagesize) {
      // 最大偏移量（总数据 / 一页显示的条数，再向上取整）
      offset = Math.ceil(totalCount / pagesize);
    }
    //2.获取报修列表
    let sql = "select * from rp_record order by u_id desc limit " + offset + "," + pagesize;
    const sqlArr = [];
    const callback = (err, data) => {
      if (err) {
        console.log("报修记录查询失败", err);
        res.sendResult(null, 500, "系统故障");
      } else {
        if (data[0] === undefined) return res.sendResult(null, 422, "请求参数错误");
        let rData = {};
        rData.total = totalCount;
        rData.currentpage = currentpage;
        rData.record = data;
        res.sendResult(rData, 200, "查询成功");
      }
    };
    dbconfig.sqlConnect(sql, sqlArr, callback);
  });
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

module.exports = {
  record,
  deleteRecord,
};
