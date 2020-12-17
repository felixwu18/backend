/* 读取分时价 */
var fs = require("fs"); //文件模块
const configsAllP = require('../data/HSAFormat') // 沪深A 4250

module.exports = function (req, res) {
    const { secid } = req.query
    const currentItem = configsAllP.find(item => item.key === secid) || {}
    const fileName = currentItem.value
    const file = `H:\\stock\\backend\\paData\\data\\fenshi\\${fileName}.json`;
    console.log('==>',fileName)
    if (currentItem) {
        //从内存中读取文件
        fs.readFile(file, 'utf-8', (err, data) => {
            if (err) {
                res.send('文件读取失败');
                console.log(err)
            } else {
                res.send(data)
                console.log('duqu---读取缓存分时成功')
            }
        });
    }
  }