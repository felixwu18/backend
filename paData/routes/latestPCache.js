/* 读取分时价 */
var fs = require("fs"); //文件模块
const configsAllP = require('../data/HSAFormat') // 沪深A 4250

module.exports = function (req, res) {
    const { secid } = req.query
    const currentItem = configsAllP.find(item => item.key === secid) || {}
    console.log('==>',secid)
    const fileName = currentItem.value
    const file = `F:\\stock\\backend\\paData\\data\\latestP\\${fileName}.js`;
    const data = require(file)
    console.log('==>',fileName)
    res.send(data)
//     if (currentItem) {
//         //从内存中读取文件
//         fs.readFile(file, 'utf-8', (err, data) => {
//             if (err) {
//                 res.send(`文件读取失败`);
//                 // console.log(err)
//                 console.log(`duqu--${fileName}--读取缓存分时失败`)
//             } else {
//                 res.send(data)
//                 console.log(`duqu--${fileName}--读取缓存分时成功`)
//             }
//         });
//     }
  }