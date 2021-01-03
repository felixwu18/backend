
/* 个股最新价格 服务端请求数据 */
var axiosFetch = require("../utils/axiosRequest");
var download = require("../utils/http");
const configsAllP = require('../data/HSAFormat') // 沪深A 4250
// const configsAllP = require('../data/syhh12-19') // syhh12-19

// const configsAllP = require('../data/bankuaiParts/食品饮料') // 板块类股
var fs = require("fs"); //文件模块

/* 工具函数 */
const codeToSecid = require('../utils/codeToSecid')

const sssfSelect = require('../utils/xtmethods/sssf') // 上升三法
const jywdSelect = require('../utils/xtmethods/jywd') // 九阳洼地
const jztdSelect = require('../utils/xtmethods/jztd') // 金针探底
const blqdSelect = require('../utils/xtmethods/blqd') // 倍量启动
const blp20aSelect = require('../utils/xtmethods/blp20a') // 倍量突破20均
const yyhhSelect = require('../utils/xtmethods/yyhh') // 阴阳互换
const sysgSelect = require('../utils/xtmethods/sysg') // 三阳上轨

const stockCashFlowWatch = require('./stockCashFlow') // 个股资金流向

module.exports = function (req, resp) {
    /* _ 更新最新数据 沪深A 4250 只  po升降序指标 fid 排序参考指标*/
    const finalSelects = []
    configsAllP.forEach((item, index) => {
        // configsAllP.slice(0, 1).forEach((item, index) => {
        /*secid id   _ 更新最新数据*/
        // console.log(`${item.key}--${item.value}--${index}`)
        // const secid = '1.600570' // 恒生电子
        // const secid = '0.002594' 
        const secid = item.key
        const _ = Date.now() // 更新
        const service = 'http://55.push2his.eastmoney.com/api/qt/stock/kline/get'
        const urlParams = `secid=${secid}&ut=fa5fd1943c7b386f172d6893dbfba10b&fields1=f1%2Cf2%2Cf3%2Cf4%2Cf5%2Cf6&fields2=f51%2Cf52%2Cf53%2Cf54%2Cf55%2Cf56%2Cf57%2Cf58%2Cf59%2Cf60%2Cf61&klt=101&fqt=0&end=20500101&lmt=120&_=${_}`
        const url = `${service}?${urlParams}`
        setTimeout(() => {
            download(url, res => {
                // resp.send(data);
                console.log(`${item.key}--${item.value}==> 最新个股信息查询成功`);
                // console.log(typeof res)
                res = JSON.parse(res)
                if (!res.data) { return }
                /* index 最高3 最低4 */
                /* 上升三法 */
                if (typeof res.data.klines !== 'object' || res.data.klines.length < 4) { return }
                const consditon1 = sssfSelect(res.data.klines.reverse())
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

                /* 倍量突破20均 */
                if (typeof res.data.klines !== 'object' || res.data.klines.length < 20) { return }
                const consditon2 = blp20aSelect(res.data.klines.reverse().slice(1))

                /* 阴阳互换 */
                if (typeof res.data.klines !== 'object' || res.data.klines.length < 20) { return }
                const consditon3 = yyhhSelect(res.data.klines.reverse().slice(1))

                /* 三阳上轨 */
                // if (typeof res.data.klines !== 'object' || res.data.klines.length < 20) { return }
                // const consditon = sysgSelect(res.data.klines.reverse().slice(0, 20))


                // if (consditon&&mastersBuyCondition) {
                    console.log(item.value, 'item.value--')
                const consditonNoST = item.value.search('ST') === -1 && item.value.indexOf('*ST') === -1
                const consditon = consditon1 || consditon2 || consditon3
                if (consditon && consditonNoST) {
                    finalSelects.push(item)
                }
                console.log(`${consditon}--finalSelects---${index}`)
            })
        }, 150 * index)
    })

    /* 定时取数据 */
    let writePath = 'H:\\stock\\backend\\paData\\data\\yhhhSelect-12-19.js'; //生成文件
    setInterval(() => {
        console.log(finalSelects, `====${finalSelects.length}===>finalSelects`)
    }, 1000 * 3);

    //将文件写入磁盘
    // setTimeout(() => {
    //     console.log(finalSelects, '==>finalSelects')
    //     fs.writeFile(writePath, JSON.stringify(finalSelects), function (err, m) {
    //         console.log('==>finalSelects写入数据')
    //     }); //将文件写入磁盘
    // }, 1000 * 2);



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