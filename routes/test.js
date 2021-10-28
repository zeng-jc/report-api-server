let express = require("express");
let router = express.Router();

var db = require("../util/db"); //引入db

/* GET home page. */
router.get("/", function (req, res) {
  var results = {};
  db.query("SELECT * FROM rp_record", [], function (err, rows) {
    results = rows;
    console.log("-------------------------");
    // console.log("results: " + results);
    res.send(results);
  });
});

module.exports = router;
