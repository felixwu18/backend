/* latestP 缓存120天数据 */
var fs = require("fs"); //文件模块
const configsAllP = require('../data/HSAFormat') // 沪深A 4250
// const configsAllP = require('../data/bankuaiParts/军工') // 版块类查看
var download = require("../utils/http");

module.exports = function (req, resp) {
    resp.send('写入开始中...！')
    // configsAllP.reverse().forEach((currentItem, index) => {
    /*secid id   _ 更新最新数据*/
    const { secid, data } = req.body;
    const currentItem = configsAllP.find(currentItem => currentItem.key === secid)
    // const secid = currentItem.key
    const service = 'http://55.push2his.eastmoney.com/api/qt/stock/kline/get'
    const urlParams = `secid=${secid}&ut=fa5fd1943c7b386f172d6893dbfba10b&fields1=f1%2Cf2%2Cf3%2Cf4%2Cf5%2Cf6&fields2=f51%2Cf52%2Cf53%2Cf54%2Cf55%2Cf56%2Cf57%2Cf58%2Cf59%2Cf60%2Cf61&klt=101&fqt=0&end=20500101&lmt=120&_=${Date.now()}`
    const url = `${service}?${urlParams}`
    // console.log(`${currentItem.key}--${currentItem.value}--${index}==> 最新个股信息查询开始`);
    download(url, res => {
        console.log(`${currentItem.value}==> 最新个股信息查询成功`);
        res = JSON.parse(res)
        if (!res.data || !res.data.name) { return }
        // resp.send(res)
        const file = `module.exports = ${JSON.stringify(res)}`;
        const fileName = currentItem.value
        let writePath = `H:\\stock\\backend\\paData\\data\\latestP\\${fileName}.js`; //生成目录
        // setTimeout(() => {
        fs.writeFile(writePath, file, (err, m) => {
            // resp.send('写入成功！')
            console.log(err, m, `err--m-${fileName}lataetP缓存写入成功！`)
        }); //将文件写入磁盘
        // }, 1000 * 20);
    })
    // })
}