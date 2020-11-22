const configsP = require('../data/latestP')

module.exports = function (req, res) {
    console.log(res);
      res.send(configsP);
}