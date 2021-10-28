var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var sendResult = require("./common/sendResult");

// 导入路由文件
var indexRouter = require("./routes/index");
var adminRouter = require("./routes/admin");
var reportRouter = require("./routes/report");
// 测试接口
var testRouter = require("./routes/test");

var app = express();
// 统一返回接口
app.use(sendResult);

//后端添加请求头解决跨域
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("X-Powered-By", " 3.2.1");
  next();
});

// 改写入口文件
var http = require("http");
var server = http.createServer(app);

// 设置解析参数
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// 路由
app.use("/", indexRouter);
// 测试接口
app.use("/test", testRouter);

// 前台报修的接口
app.use("/api/report/v1", reportRouter);
// 后台管理系统的接口
app.use("/api/admin/v1/", adminRouter);
// 静态资源
app.use(express.static("public"));

server.listen("3000");
