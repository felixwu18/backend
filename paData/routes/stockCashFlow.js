
/* 个股资金流向情况 主力，超大单，大单， 中单， 小单 */
var download = require("../utils/http");

module.exports = function stockCashFlow(req, res) {
    return new Promise((resolve => {
        const { secid = '0.002594', updateTime: _ = Date.now() } = req.query;
        const service = 'http://push2his.eastmoney.com/api/qt/stock/fflow/daykline/get'
        const urlParams = `lmt=0&klt=101&secid=${secid}&fields1=f1,f2,f3,f7&fields2=f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61,f62,f63,f64,f65&ut=b2884a393a59ad64002292a3e90d46a5&_=${_}`
        const url = `${service}?${urlParams}`
        download(url, data => {
            const temp = JSON.parse(data)
            // console.log(temp.data, 'temp');
            // "2020-12-08,-229514960.0,170524880.0,58990080.0,-106009920.0,-123505040.0,-2.87,2.13,0.74,-1.33,-1.54,177.97,1.53,0.00,0.00"
            /* 单个交易日资金字符串，单位：亿或万
               流入状态:
               主力净额--index 1 净占比--index 6,
               超大单净额--index 5 净占比--index 10
               大单净额--index 4 净额比--index 9
            */
            const cashFlowArr = temp.data.klines.reverse() // 时间降序 cashFlowArr 资金流数组
            const masterBuys = cashFlowArr.map(item => item.split(',')[1]) // 主力净额
            const superBillBuys = cashFlowArr.map(item => item.split(',')[5]) // 超大单净额
            // const bigBillBuys = cashFlowArr.map(item => item.split(',')[4]) // 大单净额
            const pre4DayMasterBuys = masterBuys.slice(1, 5)
            const pre4DaySuperBillBuys = masterBuys.slice(1, 5)
            let conditionMaster, conditionBigBill
            /* 主力 */
            if (masterBuys[0] > 0 && !pre4DayMasterBuys.find(buy => buy > 0) && masterBuys[5] > 0) {
                conditionMaster = true
            }
            /* 超大单 */
            if (superBillBuys[0] > 0 && !pre4DaySuperBillBuys.find(buy => buy > 0) && superBillBuys[5] > 0) {
                conditionBigBill = true
            }
            console.log(conditionMaster&&conditionBigBill)
            resolve(conditionMaster&&conditionBigBill)
        })
    }))
}

// axios.get(url)
// .then(data => {
//     console.log(data)
//     res.send(JSON.stringify(data))
// })
// .catch(err => {
//     console.error(err)
// })
