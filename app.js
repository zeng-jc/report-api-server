var createError = require("http-errors");
var express = require("express");
let bodyParser = require("body-parser");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// 解析提交的json参数
let jsonParser = bodyParser.json();
// 解析提交的form表单参数
let urlencodedParser = bodyParser.urlencoded({ extended: true });

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var reportRouter = require("./routes/report");

var app = express();

// 解决跨域
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

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api/private/v1", jsonParser, reportRouter);

server.listen("3000");
