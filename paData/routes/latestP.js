
var http = require("http");
var download = require("../utils/http");


module.exports = function (req, res) {
    //   console.log(req.body); //前端发送的请求内容
    // res.send('get successfully!');
    console.log(req.query);
    /*secid id   _ 更新最新数据*/
    const updateTime = Date.now() // 更新
    const { secid = '0.002594', updateTime: _ = updateTime } = req.query;
    const service = 'http://55.push2his.eastmoney.com/api/qt/stock/kline/get'
    const urlParams = `cb=jQuery112405742298141007565_1605946330705&secid=${secid}&ut=fa5fd1943c7b386f172d6893dbfba10b&fields1=f1%2Cf2%2Cf3%2Cf4%2Cf5%2Cf6&fields2=f51%2Cf52%2Cf53%2Cf54%2Cf55%2Cf56%2Cf57%2Cf58%2Cf59%2Cf60%2Cf61&klt=101&fqt=0&end=20500101&lmt=120&_=${_}`
    const url = `${service}?${urlParams}`
    download(url, data => {
      console.log(data);
      res.send(data);
      // res.sendStatus(data)
    })
  }
  //处理post请求
  // app.post('/latestP', function (req, res) {
  //   console.log(req); //前端发送的请求内容
  //   // res.send('post successfully!');
  //   res.send(arr);
  //   // res.send(obj);
  // });