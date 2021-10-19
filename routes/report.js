let express = require("express");
let router = express.Router();

// 存储报修信息
const dbconfig = require("../util/dbconfig");

let reportList = require("../controller/reportContrl/reportList.js");
let addReport = require("../controller/reportContrl/addReport.js");

/* GET home page. */
router.post("/report", addReport);
router.get("/report", reportList);

module.exports = router;
