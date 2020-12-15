/* 分时价写入 最多缓存20天 */
var fs = require("fs"); //文件模块
const configsAllP = require('../data/HSAFormat') // 沪深A 4250


module.exports = function (req, res) {
    /*secid id   _ 更新最新数据*/
    const { secid, data } = req.body;
    const currentItem = configsAllP.find(item => item.key === secid)
    if (currentItem && data) {
        const file = data;
        const fileName = currentItem.value
        let writePath = `H:\\stock\\backend\\paData\\data\\fenshi\\${fileName}.json`; //生成目录
        fs.writeFile(writePath, JSON.stringify(file), (err, m) => {
            console.log(err, m, 'err--m')
            res.send('写入成功！')
        }); //将文件写入磁盘
    }
}