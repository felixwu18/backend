//在任何一个页面控制台fetch 获得http://127.0.0.1:6600的后台响应数据(Hello World),均可
var download = require("../utils/http");
// -------> 后端代码
// var express = require("express");
// var app = express();
var obj = {
  name: '孙悟空',
  sex: 'nan'
};
var arr = [1, 2, 3, obj];
module.exports = function (req, res) {

      console.log(req.query)
    //   res.send(obj); //发送回前端页面,响应前端
    const updateTime = Date.now() // 更新
    const { secid = '0.002594', updateTime: _ = updateTime } = req.query;
    const service = 'http://172.16.25.136:8080/user/login'
    const urlParams = `name=tp_cd&password=1234qwer&_=${_}`
    // secid=${secid}&ut=fa5fd1943c7b386f172d6893dbfba10b&fields1=f1%2Cf2%2Cf3%2Cf4%2Cf5%2Cf6&fields2=f51%2Cf52%2Cf53%2Cf54%2Cf55%2Cf56%2Cf57%2Cf58%2Cf59%2Cf60%2Cf61&klt=101&fqt=0&end=20500101&lmt=120&_=${Date.now()}
    // const url = `${service}?${urlParams}`
    const url = `${service}?${urlParams}`
    download(url, data => {
      res.send(data);
      console.log('==> 查询成功');
      // res.sendStatus(data)
    })
}
