let express = require("express");
let router = express.Router();
let report = require("../controller/reportContr");

/* GET home page. */
router.post("/report", report.addReport);
router.get("/report", report.reportList);

module.exports = router;
