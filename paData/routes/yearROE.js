
/* 个股加权净资产收益率 */
var download = require("../utils/http");
const configsAllP = require('../data/HSAFormat') // 沪深A 4250

module.exports = function (req, res) {
              let { secid } = req.query;
              const currentItem = configsAllP.find(item => item.key === secid) || {}
              let code = ''
              if (currentItem.key) {
                  code = `${currentItem.key[2] === '6' ? 'SH' : 'SZ'}${(secid || '0.002594').slice(2)}`
              }
              const service = 'http://f10.eastmoney.com/NewFinanceAnalysis/DubangAnalysisAjax'
              const urlParams = `code=${code}`
              // http://f10.eastmoney.com/NewFinanceAnalysis/DubangAnalysisAjax?code=SH601012
              const url = `${service}?${urlParams}`
              // console.log(url, 'url------')
              download(url, data => {
                            res.send(data);
                            console.log('==> 个股年净资产收益率');
                            // res.sendStatus(data)
              })
}