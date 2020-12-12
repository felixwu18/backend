// ----------------   引用模块   -----------------//
var express = require('express');
var app = express();

//设置跨域访问（设置在所有的请求前面即可）
app.all("*", function (req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", "*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers", "content-type");
  //跨域允许的请求方式
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  if (req.method == 'OPTIONS')
  res.send(200); //让options尝试请求快速结束
  else
  next();
});


// var writeD = require("./utils/readWrite"); // 读写
// writeD()
//  import路由
var pagePaChongRoute = require("./routes/pachong/pagePC"); // 爬虫测试
var toDoRouteP = require("./routes/latestP"); // 最新个股价
var configsRoute = require("./routes/base"); // 个股下拉配置数据
var bankuaiConfigsRoute = require("./routes/bankuaiP"); // 版块下拉配置数据
var rzrqConfigsRoute = require("./routes/rzrq"); // 融资融券
var HSAStockRoute = require("./routes/HSAStock"); // 沪深A
var XTSelectStockRoute = require("./routes/XTSelectStock"); // 形态选股
var stockCashFlowRoute = require("./routes/stockCashFlow"); // 个股资金流向
var bankuaiPartsRoute = require("./routes/bankuaiParts"); // 版块成分股
var fenshiPRoute = require("./routes/FenShiSelectStock"); // 分时策略


// ------------------ 接口  ----------------------//

/* 测试爬虫 */
app.get('/pagePaChong', pagePaChongRoute)

/* 1 最新Price接口 */
app.get('/latestP', toDoRouteP)

/* 2 获取个股最新Price参数配置数据接口 */
app.get('/latestPQuery', configsRoute)

/* 3 获取版块最新Price参数配置数据接口 */
app.get('/bkLatestPQuery', bankuaiConfigsRoute)

/* 4 获取两融余额情况接口 */
app.get('/rzrqQuery', rzrqConfigsRoute)

/* 5 获取沪深两市A股 4250只 */
app.get('/HSAStock', HSAStockRoute)

/* 6 形态选股 */
app.get('/XTSelectStock', XTSelectStockRoute)

/*  7 个股资金流向 */
app.get('/stockCashFlow', stockCashFlowRoute)

/*  8 版块成分股 */
app.get('/bankuaiParts', bankuaiPartsRoute)

/*  9 分时策略 */
app.get('/fenshiSelectStock', fenshiPRoute)




// ----------------   监听端口   ------------------//
//监听
var server = app.listen(4000, function () {
  var port = server.address().port
  console.log(`引用实例,访问地址为 http://127.0.0.1:${port}`);
});


// app.get('/',function(req,res){
//   res.send('Hello World');
// });
// app.get('/zs',function(req,res,){
//   res.send('你好,get,张三');
// });
// app.get('/zs',function(req,res,){
//   res.send('你好,get,张三');
// });


/*
-- -- -- -- > 前端代码

fetch("http://127.0.0.1:6600/", {
    method: "post",
    body: JSON.stringify({
      opt: "add",
      sex: "nan"
    }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json" //此处请求头为json
    }
  })
  .then(function(d) {
    return d.text();
  })
  .then(function(d) {
    console.info(JSON.parse(d));
  });

*/