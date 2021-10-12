let express = require("express");
let router = express.Router();
let test = require("../controller/reportContr");

/* GET home page. */
router.get("/api/add_report", test.addReport);

module.exports = router;
