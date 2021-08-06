
/* 个股最新价格 服务端请求数据 */
var download = require("../utils/http");
const configsAllP = require('../data/HSAFormat') // 沪深A 4250
// const configsAllP = require('../data/ROE-04-24') // ROESelect-04-24

// const configsAllP = require('../data/bankuaiParts/食品饮料') // 板块类股
var fs = require("fs"); //文件模块


module.exports = function selectFn(req, resp) {
    /* _ 更新最新数据 沪深A 4250 只  po升降序指标 fid 排序参考指标*/
   
    const finalSelects = []
    // const ttt = [{ key: '0.002594', value: '比亚迪', pym: 'byd', marketT: 'sz' }]
    configsAllP.slice(3000, 4000).forEach((item, index) => {
        // ttt.forEach((item, index) => {
        /*secid id   _ 更新最新数据*/
        console.log(`${item.key}--${item.value}--${index}`)
        // const secid = '1.600570' // 恒生电子
        // const secid = '0.002594'
        const secid =  `${item.marketT}${item.key.slice(-6)}`
        const service = 'http://f10.eastmoney.com/ProfitForecast/ProfitForecastAjax'
        const urlParams = `code=${secid}`
        const url = `${service}?${urlParams}`
        // console.log(url);
        setTimeout(() => {
            download(url, async res => {
                // resp.send(res);
                console.log(`${item.key}--${item.value}==> 最新个股券商评级数查询成功`);
                res = JSON.parse(res)
                // console.log(res.pjtj)
                if (!res.pjtj) { return }
                const [oneMonth, twoMonthes, threeMonthes, sixMonthes, oneYear] =  res.pjtj
                // if (consditon) {
                // mr 买入 zc增持 zjs 评级券商数
                // console.log('oneYear', oneYear.zjs);
                // const conditon1 = oneMonth.zjs > twoMonthes.zjs / 2 && twoMonthes.zjs / 2 > threeMonthes.zjs

                const consditon = oneYear.zjs > 30 && oneMonth.zjs > 0 && twoMonthes.zjs > 0 && threeMonthes.zjs > 0
                if (consditon) {
                    finalSelects.push({ ...item, oneMonth: oneMonth.zjs, twoMonthes: twoMonthes.zjs, threeMonthes: threeMonthes.zjs, sixMonthes: sixMonthes.zjs, oneYear: oneYear.zjs })
                }
                console.log(`${consditon}--finalSelects---${index}`)
                /* 最后一个处理后 写入数据 */
                    setTimeout(() => {
                        let writePath = 'F:\\stock\\backend2\\paData\\data\\brokerRating4.js'; //生成文件
                        const file = `module.exports = ${JSON.stringify(finalSelects)}`
                        fs.writeFile(writePath, file, function (err, m) {
                            console.log(err, finalSelects, '==>finalSelects写入数据')
                        }); //将文件写入磁盘
                    }, 1000 * 20 * 5); // 一千只回调完 写数据
            })
        }, 200 * index);
    })
    resp.send('启动券商评级数量查询...');
    /* 定时取数据 */
    setInterval(() => {
        console.log(finalSelects, `====${finalSelects.length}===>finalSelects`)
    }, 1000 * 3);
}