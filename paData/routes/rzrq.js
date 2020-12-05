
/* 融资融券数据 服务端请求 */
var download = require("../utils/http");


module.exports = function (req, res) {
    const updateTime = Date.now() // 更新
    const { updateTime: _ = updateTime } = req.query;
    // const url = `http://datacenter.eastmoney.com/api/data/get?callback=datatable291416&type=RPTA_RZRQ_LSHJ&sty=ALL&source=WEB&st=dim_date&sr=-1&p=1&ps=50&filter=&pageNo=1&_=${_}`
    const url = `http://datacenter.eastmoney.com/api/data/get?type=RPTA_RZRQ_LSHJ&sty=ALL&source=WEB&st=dim_date&sr=-1&p=1&ps=50&filter=&pageNo=1&_=${_}`
    download(url, data => {
      res.send(data);
      // res.sendStatus(data)
    })
  }