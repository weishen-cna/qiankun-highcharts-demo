//引入exprexx模块
var express = require("express");
var history = require('connect-history-api-fallback');
var app = express();
app.use(history())
app.use(express.static("public"));

app.use((req, res, next) => {
  // res.header('Content-Type', "text/event-stream")
  res.header('Cache-Control', "no-cache")
  res.header('Connection', "keep-alive")
  if(req.method === 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
  // res.header('Access-Control-Allow-Origin', "*");
  // res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length,Authorization,Accept,X-Requested-With');
  // res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS');
  // res.header('X-Powered-By', '3.2.1')
  // if(req.method === 'OPTIONS') {
  //   res.send(200);
  // } else {
  //   next();
  // }
});

app.get("/*", (req, res) => {
  res.sendFile(__dirname + "/" + "index.html");
});

//设置端口3000访问地址，即http://localhost:3000
var server = app.listen(3333, () => {
  var port = server.address().port;
  console.log("访问地址 http://localhost:%s", port);
});
