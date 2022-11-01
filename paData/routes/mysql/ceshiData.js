
const ceshidata = require('./data')


module.exports = function (req, res) {
    console.log('ceshidata业务！！')
    res.send(ceshidata);
}