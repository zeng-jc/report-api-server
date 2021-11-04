let express = require("express");
let router = express.Router();

let reportList = require("../controller/reportContrl/reportList.js");
let addReport = require("../controller/reportContrl/addReport.js");
// let reportAddress = require("../controller/reportContrl/reportAddress.js");

/* GET home page. */
router.post("/report", addReport);
router.get("/report", reportList);
// router.get("/address", reportAddress);

module.exports = router;
