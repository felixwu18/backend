
/* 个股最新价格 服务端请求数据 */
var download = require("../utils/http");

module.exports = function (req, res) {
    //   console.log(req.body); //前端发送的请求内容
    // res.send('get successfully!');
    // console.log(req.query);
    /*secid id   _ 更新最新数据*/
    const updateTime = Date.now() // 更新
    const {  updateTime: _ = updateTime } = req.query;
    const service = 'http://7.push2.eastmoney.com/api/qt/clist/get'
    const urlParams = `pn=1&pz=4250&po=1&np=1&ut=bd1d9ddb04089700cf9c27f6f7426281&fltt=2&invt=2&fid=f3&fs=m:0+t:6,m:0+t:13,m:0+t:80,m:1+t:2,m:1+t:23&fields=f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f22,f11,f62,f128,f136,f115,f152&_=${_}`
    const url = `${service}?${urlParams}`
    download(url, data => {
        const temp = []
        const parseD = JSON.parse(data).data.diff
        parseD.forEach(item => {
            if(item.f14[0] === '博' && item.f14[3] === '技' && item.f3 > 2) {
               temp.push(item)
            }
        })
      console.log(temp)
      res.send(data);
      // res.sendStatus(data)
    })
  }