var express = require("express");
var router = express.Router();

// 验证中间件
let isAdmin = require("../controller/adminContrl/isAdmin.js");
// 路由处理函数
let { login } = require("../controller/adminContrl/login.js");
let { record, deleteRecord, recordId } = require("../controller/adminContrl/record.js");

/* GET users listing. */
router.post("/login", login);
router.get("/record", isAdmin, record);
router.delete("/record/:id", isAdmin, deleteRecord);
router.get("/record/:id", isAdmin, recordId);

module.exports = router;
