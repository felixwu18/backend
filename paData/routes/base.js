// const configsP = require('../data/latestP') // 自选类
// const configsP = require('../data/sssf12-6') // sssf12-6
// const configsP = require('../data/sssf12-7') // sssf12-7
const configsP = require('../data/jywd12-8') // jywd12-8
const configsAllP = require('../data/HSAFormat') // 沪深A 4250

module.exports = function (req, res) {
    console.log(res);
      res.send(configsP);
}