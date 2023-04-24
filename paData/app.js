// ----------------   引用模块   -----------------//
var express = require("express");
var app = express();

// 中间件
var bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "25mb" })); // 将中间件注入express, post 接受参数必须加入
// app.use(express.urlencoded({limit: '25mb'}));

//设置跨域访问（设置在所有的请求前面即可）
app.all("*", function (req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", "*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers", "content-type");
  //跨域允许的请求方式
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  if (req.method == "OPTIONS") res.sendStatus(200); //让options尝试请求快速结束
  else next();
});

// var writeD = require("./utils/readWrite"); // 读写
// writeD()
//  import路由
var pagePaChongRoute = require("./routes/pachong/pagePC"); // 爬虫测试
var pagePaChongRoute2 = require("./routes/pachong/pagePC2"); // 爬虫测试
var pagePC2FromConsole = require("./routes/pachong/pagePC2FromConsole"); // 从控制台请求获取数据
var setFileNamesRoute = require("./routes/setFileNames"); // 写入缓存分时回调
var setCacheFSPRoute = require("./routes/setCacheFSP"); // 写入缓存分时回调
var getCacheFSPRoute = require("./routes/getCacheFSP"); // 读取缓存分时回调
var setCache120DayRoute = require("./routes/setCache120Day"); // 缓存半年数据
var clsNewsRoute = require("./routes/clsNews"); // 缓存半年数据
var ceshimysqlRoute = require("./routes/mysql/index"); // 测试mysql查询
var ceshiDataRoute = require("./routes/mysql/ceshiData"); // 测试业务数据

var test1 = require("./routes/test1"); //
var toDoRouteP = require("./routes/latestP"); // 最新个股价
var toDoRoutePCache = require("./routes/latestPCache"); // 最新个股价 缓存
var toDoRoutePAll = require("./routes/latestPAll"); // 模糊查询所有最新个股价
var configsRoute = require("./routes/base"); // 个股下拉配置数据
var bankuaiConfigsRoute = require("./routes/bankuaiP"); // 版块下拉配置数据
var rzrqConfigsRoute = require("./routes/rzrq"); // 融资融券
var HSAStockRoute = require("./routes/HSAStock"); // 沪深A
var XTSelectStockRoute = require("./routes/XTSelectStock"); // 形态选股
var stockCashFlowRoute = require("./routes/stockCashFlow"); // 个股资金流向
var bankuaiPartsRoute = require("./routes/bankuaiParts"); // 版块成分股
var historyCashFlowOfBanKuaiRoute = require("./routes/historyCashFlowOfBanKuai"); // 版块资金流向
var fenshiPRoute = require("./routes/FenShiSelectStock"); // 分时策略
var fenshiLatestPRoute = require("./routes/fenshiLatestP"); // 分时查询
var historyCashFlowRoute = require("./routes/historyCashFlow"); // 历史资金流
var imediateCashFlowRoute = require("./routes/imediateCashFlow"); // 即时资金流
var dzjLatestRoute = require("./routes/dzjLatest"); // 大资金持股情况
var dzjSelectStockRoute = require("./routes/dzjSelectStock"); // 大资金持股选股
var yearROERoute = require("./routes/yearROE"); // 年资产收益率 15%以上为优秀， 10%以上也不错
var FinanceTableDataRoute = require("./routes/FinanceTableData"); // 财务分析数据 营业收入， 净利润等
var brokerRatingRoute = require("./routes/brokerRating"); // 券商评级

// ------------------ 接口  ----------------------//

/* 测试爬虫 */
app.get("/pagePaChong", pagePaChongRoute);
app.get("/pagePaChong2", pagePaChongRoute2);
app.post("/pagePC2FromConsole", pagePC2FromConsole);

app.post("/setCacheFSP", setCacheFSPRoute); // 接受前端分时数据写缓存
app.get("/getCacheFSP", getCacheFSPRoute); // 获取缓存分时数据

app.post("/setCache120Day", setCache120DayRoute); // 缓存半年数据

app.post("/setFileNames", setFileNamesRoute); // 缓存已缓存的名录

app.get("/getclsNews", clsNewsRoute); // 获取财联社数据

app.get("/ceshimysql", ceshimysqlRoute); // 测试数据库

app.get("/ceshiData", ceshiDataRoute); // 测试业务数据

/* 1 最新Price接口 */
app.get("/test1", test1);
app.get("/latestP", toDoRouteP);
app.get("/latestPCache", toDoRoutePCache);
app.get("/latestPAll", toDoRoutePAll); // 模糊查询 所有股数据

/* 2 获取个股最新Price参数配置数据接口 */
app.get("/latestPQuery", configsRoute);

/* 3 获取版块最新Price参数配置数据接口 */
app.get("/bkLatestPQuery", bankuaiConfigsRoute);

/* 4 获取两融余额情况接口 */
app.get("/rzrqQuery", rzrqConfigsRoute);

/* 5 获取沪深两市A股 4250只 */
app.get("/HSAStock", HSAStockRoute);

/* 6 形态选股 */
app.get("/XTSelectStock", XTSelectStockRoute);
app.get("/dzjSelectStock", dzjSelectStockRoute);

/*  7 个股资金流向 */
app.get("/stockCashFlow", stockCashFlowRoute);

/*  7 个股资金流向 */
app.get("/stockCashFlow", stockCashFlowRoute);

/*  8 版块成分股 */
app.get("/bankuaiParts", bankuaiPartsRoute);
app.get("/historyCashFlowOfBanKuai", historyCashFlowOfBanKuaiRoute);

/*  9 分时策略 */
app.get("/fenshiSelectStock", fenshiPRoute);

/*  10 分时价查询 */
app.get("/fenshiLatestP", fenshiLatestPRoute);

/*  11 个股历史资金流查询 */
app.get("/historyCashFlow", historyCashFlowRoute);

/*  12 个股即时资金流查询 */
app.get("/imediateCashFlow", imediateCashFlowRoute);

/*  13 个股大资金情况查询 */
app.get("/dzjLatest", dzjLatestRoute);

/*  14 年资产收益率查询 */
app.get("/yearROE", yearROERoute);

/*  15 财务数据(营业收入，净利润等)查询 */
app.get("/FinanceTableData", FinanceTableDataRoute);

/*  15 财务数据(营业收入，净利润等)查询 */
app.get("/brokerRating", brokerRatingRoute);

// ----------------   监听端口   ------------------//
//监听
var server = app.listen(4000, function () {
  var port = server.address().port;
  console.log(`引用实例,访问地址为 http://127.0.0.1:${port}`);
});
