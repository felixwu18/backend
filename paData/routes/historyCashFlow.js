
/* 个股历史资金流 */
var download = require("../utils/http");


module.exports = function (req, res) {
    //   console.log(req.body); //前端发送的请求内容
    // res.send('get successfully!');
    // console.log(req.query);
    /*secid id   _ 更新最新数据*/
    const updateTime = Date.now() // 更新
    const { secid = '0.002594', updateTime: _ = updateTime } = req.query;
    const service = 'http://push2his.eastmoney.com/api/qt/stock/fflow/daykline/get'
    const urlParams = `lmt=0&klt=101&secid=${secid}&fields1=f1,f2,f3,f7&fields2=f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61,f62,f63,f64,f65&ut=b2884a393a59ad64002292a3e90d46a5&_=${_}`
    // http://push2his.eastmoney.com/api/qt/stock/fflow/daykline/get?cb=jQuery1123005075426240570513_1611245703811&lmt=0&klt=101&fields1=f1%2Cf2%2Cf3%2Cf7&fields2=f51%2Cf52%2Cf53%2Cf54%2Cf55%2Cf56%2Cf57%2Cf58%2Cf59%2Cf60%2Cf61%2Cf62%2Cf63%2Cf64%2Cf65&ut=b2884a393a59ad64002292a3e90d46a5&secid=0.002594&_=1611245703812

    const url = `${service}?${urlParams}`
    download(url, data => {
      res.send(data);
      console.log('==> 个股历史资金流');
      // res.sendStatus(data)
    })
  }