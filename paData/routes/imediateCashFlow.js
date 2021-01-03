
/* 个股即时资金流 */
var download = require("../utils/http");


module.exports = function (req, res) {
    //   console.log(req.body); //前端发送的请求内容
    // res.send('get successfully!');
    // console.log(req.query);
    /*secid id   _ 更新最新数据*/
    const updateTime = Date.now() // 更新
    const { secid = '0.002594', updateTime: _ = updateTime } = req.query;
    const service = 'http://push2.eastmoney.com/api/qt/stock/fflow/kline/get'
    const urlParams = `lmt=0&klt=1&secid=${secid}&fields1=f1,f2,f3,f7&fields2=f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61,f62,f63&ut=b2884a393a59ad64002292a3e90d46a5&_=${_}`
    const url = `${service}?${urlParams}`
    download(url, data => {
      res.send(data);
      console.log('==> 个股即时资金流');
      // res.sendStatus(data)
    })
  }