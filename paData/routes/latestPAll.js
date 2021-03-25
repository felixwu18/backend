
/* 个股最新价格 服务端请求数据 */
var download = require("../utils/http");


module.exports = function (req, res) {
    //   console.log(req.body); //前端发送的请求内容
    // res.send('get successfully!');
    // console.log(req.query);
    /*secid id   _ 更新最新数据*/
    const updateTime = Date.now() // 更新
    const { input = '002594', updateTime: _ = updateTime } = req.query;
    const service = 'http://searchapi.eastmoney.com/api/suggest/get'
    const urlParams = `input=${input}&type=14&token=D43BF722C8E33BDC906FB84D85E326E8&markettype=&mktnum=&jys=&classify=&securitytype=&status=&count=5&_=${_}`
    // http://searchapi.eastmoney.com/api/suggest/get?cb=jQuery11240029779004575189782_1616485303852&input=byd&type=14&token=D43BF722C8E33BDC906FB84D85E326E8&markettype=&mktnum=&jys=&classify=&securitytype=&status=&count=5&_=1616485303982
    // http://searchapi.eastmoney.com/api/suggest/get?cb=jQuery112403442645517936809_1616485788665&input=002594&type=14&token=D43BF722C8E33BDC906FB84D85E326E8&markettype=&mktnum=&jys=&classify=&securitytype=&status=&count=5&_=1616485788767
    const url = `${service}?${urlParams}`
    download(url, data => {
      res.send(data);
      console.log('==> 模糊查询最新个股信息查询成功');
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