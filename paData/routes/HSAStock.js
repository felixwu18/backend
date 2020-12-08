
/* 个股最新价格 服务端请求数据 */
var download = require("../utils/http");
var axios = require("axios");
// params = { updateTime: Date.now(), ...params }
//         const queryStr = qs.stringify(params)
//         axios.get(`http://127.0.0.1:4000/bkLatestPQuery?${queryStr}`)
//             .then(res => {
//                 //  debugger
//                 //  const jsonD = res.data.split('(')[1].split(')')[0]
//                 //      const data = res.data
//                 const data = res.data.data
//                 resolve(data)
//             })

                /*secid id   _ 更新最新数据*/
    // const updateTime = Date.now() // 更新
    // const { secid = '0.002594', updateTime: _ = updateTime } = req.query;
    // const service = 'http://55.push2his.eastmoney.com/api/qt/stock/kline/get'
    // const urlParams = `secid=${secid}&ut=fa5fd1943c7b386f172d6893dbfba10b&fields1=f1%2Cf2%2Cf3%2Cf4%2Cf5%2Cf6&fields2=f51%2Cf52%2Cf53%2Cf54%2Cf55%2Cf56%2Cf57%2Cf58%2Cf59%2Cf60%2Cf61&klt=101&fqt=0&end=20500101&lmt=120&_=${_}`
    // const url = `${service}?${urlParams}`
    
module.exports = function (req, res) {
    /* _ 更新最新数据 沪深A 4250 只  po升降序指标 fid 排序参考指标*/
    // const updateTime = Date.now() // 更新
    // const {  page = 1, size = 20, xtxg, updateTime: _ = updateTime } = req.query;
    // const service = 'http://7.push2.eastmoney.com/api/qt/clist/get'
    // const urlParams = `pn=${page}&pz=${size}&po=1&np=1&ut=bd1d9ddb04089700cf9c27f6f7426281&fltt=2&invt=2&fid=f3&fs=m:0+t:6,m:0+t:13,m:0+t:80,m:1+t:2,m:1+t:23&fields=f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f22,f11,f62,f128,f136,f115,f152&_=${_}`
    // const url = `${service}?${urlParams}`


    const updateTime = Date.now() // 更新
    const { secid = '0.002594', updateTime: _ = updateTime } = req.query;
    const service = 'http://55.push2his.eastmoney.com/api/qt/stock/kline/get'
    const urlParams = `secid=${secid}&ut=fa5fd1943c7b386f172d6893dbfba10b&fields1=f1%2Cf2%2Cf3%2Cf4%2Cf5%2Cf6&fields2=f51%2Cf52%2Cf53%2Cf54%2Cf55%2Cf56%2Cf57%2Cf58%2Cf59%2Cf60%2Cf61&klt=101&fqt=0&end=20500101&lmt=120&_=${_}`
    const url = `${service}?${urlParams}`

    // download(url, data => {
    //     const temp = []
    //     const parseD = JSON.parse(data).data.diff
    //     /* 根据部分条件过滤 */
    //     // parseD.forEach(item => {
    //     //     if(item.f14[0] === '博' && item.f14[3] === '技' && item.f3 > 2) {
    //     //        temp.push(item)
    //     //     }
    //     // })
    //     /* 形态 上升三方 */
    //     // if (xtxg == 'sssf') {
    //     //     parseD.forEach(item => {
    //     //         if(item.f14[0] === '博' && item.f14[3] === '技' && item.f3 > 2) {
    //     //            temp.push(item)
    //     //         }
    //     //     })
    //     // }
    //   console.log(temp)
    //   res.send(data);
    // })

    /* 读取本地文件 */
    // var file = path.join(__dirname, 'data/20201206HSA.json'); //文件路径，__dirname为当前运行js文件的目录
    // //var file = 'f:\\nodejs\\data\\test.json'; //也可以用这种方式指定路径
    // console.log(file)
    // fs.readFile('./data/20201206HSA.json','utf-8', (err, data) => {
    //     if (err) {
    //         res.send('文件读取失败');
    //         console.log(err)
    //     } else {
    //         // console.log(data)
    //         res.send(data);
    //     }
    // });
  }