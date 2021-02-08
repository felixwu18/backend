
/* 大资金持股情况 */
var download = require("../utils/http");
var axios = require("axios");
const configsAllP = require('../data/HSAFormat') // 沪深A 4250

module.exports = function (req, res) {
              /*secid id   _ 更新最新数据*/
              let { secid } = req.query;
              const currentItem = configsAllP.find(item => item.key === secid) || {}
              let code = ''
              if (currentItem.key) {
                  code = `${currentItem.key[2] === '6' ? 'SH' : 'SZ'}${(secid || '0.002594').slice(2)}`
              }
              const service = 'http://f10.eastmoney.com/ShareholderResearch/ShareholderResearchAjax'
              const urlParams = `code=${code}`
              // http://f10.eastmoney.com/ShareholderResearch/ShareholderResearchAjax?code=SZ002648
              const url = `${service}?${urlParams}`
              // console.log(url, 'url<====大资金情况接口路径')

              // axios.get(url)
              // .then(data => {
              // //     const data = res.data.trends
              //     console.log('==> 最新个股大资金情况查询成功');
              //     const resp = data.data
              //     res.send(JSON.stringify(resp));
              // })
              // .catch(err => {
              //     console.error(err, `--大资金--err`)
              // //     writeFailArr.push(value)
              // //     console.log(writeFailArr, `failWritStock<=== ${writeFailArr.length}`)
              // //     console.log(`-----------------------------------------------------------------------------------${"\n"}`)
              // })


              download(url, data => {
                  res.send(data);
                  console.log('==> 最新个股大资金情况查询成功');
              })
}