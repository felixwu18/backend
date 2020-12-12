
/* 个股最新价格 服务端请求数据 */
var axiosFetch = require("../utils/axiosRequest");
const configsAllP = require('../data/HSAFormat') // 沪深A 4250

const sssfSelect = require('../utils/xtmethods/sssf') // 上升三法
const jywdSelect = require('../utils/xtmethods/jywd') // 九阳洼地
const jztdSelect = require('../utils/xtmethods/jztd') // 金针探底
const stockCashFlowWatch = require('./stockCashFlow') // 个股资金流向


module.exports = function (req, res) {
    /* _ 更新最新数据 沪深A 4250 只  po升降序指标 fid 排序参考指标*/
    const finalSelects = []
    configsAllP.slice(0, 1).forEach((item, index) => {
        console.log(item.key)
        // const secid = '1.600570' // 恒生电子
        const secid = '1.688123' // 
        // const secid = item.key
        axiosFetch({ secid })
            .then(async res => {
                /* index 最高3 最低4 */
                /* 上升三法 */
                // if (typeof res.data.klines !== 'object' || res.data.klines.length < 4) { return }
                // const consditon = sssfSelect(res.data.klines.reverse())
                /* 九阳洼地 */
                // if (typeof res.data.klines !== 'object' || res.data.klines.length < 9) { return }
                // const consditon = jywdSelect(res.data.klines.reverse())

                /* 个股资金流向 */
                // const mastersBuyCondition = await stockCashFlowWatch({secid})
                /* 金针探底 */
                if (typeof res.data.klines !== 'object' || res.data.klines.length < 9) { return }
                const consditon = jztdSelect(res.data.klines.reverse())

                // if (consditon&&mastersBuyCondition) {
                if (consditon) {
                    finalSelects.push(item)
                }
                console.log(`finalSelects---${index}`)
            })
            .catch(err => {
                console.error(err)
            })
    })
    /* 定时取值 */
    setInterval(() => {
        console.log('finalSelects', finalSelects)
    }, 2000);



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