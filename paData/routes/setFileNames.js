/* 缓存已缓存的名录 */
var fs = require("fs"); //文件模块

module.exports = function (req, res) {
    /*secid id   _ 更新最新数据*/
    const { data } = req.body;
    // const currentItem = configsAllP.find(item => item.key === secid)
    if (data) {
        const file = `module.exports = ${JSON.stringify(data)}`;
        let writePath = `H:\\stock\\backend\\paData\\data\\fenshi\\names\\index.js`; //生成目录
        fs.writeFile(writePath, file, (err, m) => {
            res.send(`缓存名录更新写入成功`)
            console.log(err, m, `缓存名录写入成功！`)
        }); //将文件写入磁盘
    }
}