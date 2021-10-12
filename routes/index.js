let express = require("express");
let router = express.Router();
let test = require("../controller/reportContr");

/* GET home page. */
router.get("/", function (req, res) {
  res.send("ok");
});

module.exports = router;
