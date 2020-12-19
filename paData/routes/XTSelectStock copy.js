
/* 个股最新价格 服务端请求数据 */
var axiosFetch = require("../utils/axiosRequest");
var download = require("../utils/http");
// const configsAllP = require('../data/HSAFormat') // 沪深A 4250
const configsAllP = require('../data/bankuaiParts/网络游戏') // 游戏类
var fs = require("fs"); //文件模块

/* 工具函数 */
const codeToSecid = require('../utils/codeToSecid')

const sssfSelect = require('../utils/xtmethods/sssf') // 上升三法
const jywdSelect = require('../utils/xtmethods/jywd') // 九阳洼地
const jztdSelect = require('../utils/xtmethods/jztd') // 金针探底
const blqdSelect = require('../utils/xtmethods/blqd') // 倍量启动
const xyhhSelect = require('../utils/xtmethods/xyhh') // 阴阳互换

const stockCashFlowWatch = require('./stockCashFlow') // 个股资金流向

module.exports = function (req, resp) {
    /* _ 更新最新数据 沪深A 4250 只  po升降序指标 fid 排序参考指标*/
    const finalSelects = []
    configsAllP.slice(0, 1).forEach((item, index) => {
        /*secid id   _ 更新最新数据*/
        console.log(item.key, item.value)
        // const secid = '1.600570' // 恒生电子
        // const secid = '1.600600' // 
        const secid = item.key
        const _ = Date.now() // 更新
        // const { secid = '0.002594', updateTime: _ = updateTime } = req.query;
        const service = 'http://55.push2his.eastmoney.com/api/qt/stock/kline/get'
        const urlParams = `secid=${secid}&ut=fa5fd1943c7b386f172d6893dbfba10b&fields1=f1%2Cf2%2Cf3%2Cf4%2Cf5%2Cf6&fields2=f51%2Cf52%2Cf53%2Cf54%2Cf55%2Cf56%2Cf57%2Cf58%2Cf59%2Cf60%2Cf61&klt=101&fqt=0&end=20500101&lmt=120&_=${_}`
        const url = `${service}?${urlParams}`
        download(url, data => {
            console.log(data, item.key, item.value)
            resp.send(data);
            console.log('==> 最新个股信息查询成功');
            // res.sendStatus(data)
        // axiosFetch({ secid })
        //     .then(res => {
        // console.log(data, '<==data')
        /* index 最高3 最低4 */
        /* 上升三法 */
        // if (typeof res.data.klines !== 'object' || res.data.klines.length < 4) { return }
        // const consditon = sssfSelect(res.data.klines.reverse())
        /* 九阳洼地 */
        // if (typeof res.data.klines !== 'object' || res.data.klines.length < 9) { return }
        // const consditon = jywdSelect(res.data.klines.reverse())

        /* 个股资金流向 */
        // const mastersBuyCondition = await stockCashFlowWatch({secid})

        // /* 金针探底 */
        // if (typeof res.data.klines !== 'object' || res.data.klines.length < 9) { return }
        // const consditon = jztdSelect(res.data.klines.reverse())

        /* 倍量启动 */
        // if (typeof res.data.klines !== 'object' || res.data.klines.length < 20) { return }
        // const consditon = blqdSelect(res.data.klines.reverse())

        /* 阴阳互换 */
        // if (typeof res.data.klines !== 'object' || res.data.klines.length < 20) { return }
        // const consditon = xyhhSelect(res.data.klines.reverse().slice(11, 40))


        // if (consditon&&mastersBuyCondition) {
        // if (consditon) {
        //     finalSelects.push(item)
        // }
        // console.log(`${consditon}--finalSelects---${index}`)
    })

        // })
        // .catch(err => {
        //     resp.send(err)
        //     console.error(err)
        // })
    })

    /* 定时取数据 */
    let writePath = 'H:\\stock\\backend\\paData\\data\\jztdSelect-12-18.js'; //生成目录
    setInterval(() => {
        console.log(finalSelects, '=======>finalSelects')
    }, 1000 * 2);

    //将文件写入磁盘
    // setTimeout(() => {
    //     console.log(finalSelects, '==>finalSelects')
    //     fs.writeFile(writePath, JSON.stringify(finalSelects), function (err, m) {
    //         console.log('==>finalSelects写入数据')
    //     }); //将文件写入磁盘
    // }, 1000 * 20);



    // download(url, data => {
    //     const temp = []
    //     const parseD = JSON.parse(data).data.diff
    //     /* 根据部分条件过滤 */
    //     parseD.forEach(item => {
    //         if(item.f14[0] === '博' && item.f14[3] === '技' && item.f3 > 2) {
    //            temp.push(item)
    //         }
    //     })
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