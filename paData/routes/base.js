const configsP = require('../data/latestP') // 自选类
// const configsP = require('../data/bankuaiParts/昨日涨停') // 版块类查看
// const configsP = require('../data/sssf12-6') // sssf12-6
// const configsP = require('../data/sssf12-7') // sssf12-7
// const configsP = require('../data/jywd12-8') // jywd12-8
// const configsP = require('../data/jztdSelect-12-18') // jztdSelect-12-18

// const configsP = require('../data/strongStock') // strongStock
// const configsP = require('../data/watchStock') // watchStock
const configsAllP = require('../data/HSAFormat') // 沪深A 4250

module.exports = function (req, res) {
      res.send(configsP);
}