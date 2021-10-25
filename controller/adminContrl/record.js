// 存储报修信息
const dbconfig = require("../../util/dbconfig.js");

// 获取报修记录
function record(req, res) {
  let query = req.query.query;
  let queryKey;
  const currentpage = Number(req.query.currentpage);
  const pagesize = Number(req.query.pagesize);
  if (query !== "" && Object.prototype.toString.call(JSON.parse(query)).slice(8, -1) === "Object") {
    query = JSON.parse(query);
    queryKey = Object.keys(query)[0];
  }

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
    // 判断删除的是不是最后一页的最后一条数据
    if (totalCount + pagesize <= currentpage * pagesize) {
      // 最大偏移量（总数据 / 一页显示的条数，再向上取整）
      offset = Math.ceil(totalCount / pagesize);
    }
    let sql;
    //2.获取报修列表
    if (queryKey === "u_name" || queryKey === "u_mobile" || queryKey === "address") {
      sql =
        "select * from rp_record where " +
        queryKey +
        " like " +
        "'%" +
        query[queryKey] +
        "%'" +
        " order by u_id desc limit " +
        offset +
        "," +
        pagesize;
    } else {
      sql = "select * from rp_record order by u_id desc limit " + offset + "," + pagesize;
    }
    const sqlArr = [];
    const callback = (err, data) => {
      if (err) {
        console.log("报修记录查询失败", err);
        res.sendResult(null, 500, "系统故障");
      } else {
        if (data[0] === undefined) return res.sendResult({ total: 0, currentpage: 0, record: [] }, 200, "未找到");
        let rData = {};
        rData.total = totalCount;
        rData.currentpage = currentpage;
        rData.record = data;
        res.sendResult(rData, 200, "查询成功");
      }
    };
    console.log(sql);
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

// 根据id获取单条记录
function recordId(req, res) {
  let u_id = req.params.id;
  let sql = "select * from rp_record where u_id=" + u_id;
  const sqlArr = [];
  const callBack = (err, data) => {
    if (err) {
      console.log("查询故障", err);
      res.sendResult(null, 500, "系统故障");
    } else {
      res.sendResult(data, 200, "获取成功");
    }
  };
  console.log(sql);
  dbconfig.sqlConnect(sql, sqlArr, callBack);
}

module.exports = {
  record,
  deleteRecord,
  recordId,
};
