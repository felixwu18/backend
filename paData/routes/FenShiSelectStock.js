var axios = require("axios");
const configsAllP = require('../data/HSAFormat') // 沪深A 4250
const stockCashFlowWatch = require('./stockCashFlow') // 个股资金流向
const fenshiQuery = require('../utils/fenshiQuery') // 分时价查询
const wbsxSelect = require('../utils/fenshimethods/wbsx') // 分时稳步上行

/* 分时选股 */
module.exports = function fenshiP(req, res) {
    /* _ 更新最新数据 沪深A 4250 只  po升降序指标 fid 排序参考指标*/
    const finalSelects = []
    configsAllP.slice(0, 1).forEach((item, index) => {
        console.log(item.key)
        const secid = '1.600570' // 恒生电子
        // const secid = item.key
        fenshiQuery({ secid })
            .then(res => {
                /* index 最高3 最低4 */
                if (typeof res.data.trends !== 'object' || res.data.trends.length < 30) { return }
                // console.log('res.data.trends', res.data.trends.reverse())
                const consditon = wbsxSelect(res.data.trends.reverse(), 30) // 一般不传第二位数， 默认不截取数组
                // const consditon = ''
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

}

// /* 查询单个股分时价 */
// function fenshiQuery(params) {
//     return new Promise((resolve => {
//         const updateTime = Date.now() // 更新
//         const { secid = '0.002594', updateTime: _ = updateTime } = params;
//         const service = 'http://push2.eastmoney.com/api/qt/stock/trends2/get'
//         const urlParams = `fields1=f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f11,f12,f13&fields2=f51,f52,f53,f54,f55,f56,f57,f58&ut=fa5fd1943c7b386f172d6893dbfba10b&ndays=1&iscr=0&secid=${secid}&_=${_}`
//         const url = `${service}?${urlParams}`
//         axios.get(url)
//             .then(res => {
//                 // // const jsonD = res.data.split('(')[1].split(')')[0]
//                 // const data = JSON.parse(res.data)
//                 // console.log(res, '===>res')
//                 resolve(res.data)
//             })
//             .catch(err => {
//                 console.error(err)
//             })
//     }))
// }