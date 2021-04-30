
/* 个股加权净资产收益率 */
var download = require("../utils/http");
const configsAllP = require('../data/HSAFormat') // 沪深A 4250

module.exports = function (params) {
    return new Promise(resolve => {
        let { secid } = params;
        console.log('secid', secid);
              const currentItem = configsAllP.find(item => item.key === secid) || {}
              let code = ''
              if (currentItem.key) {
                  code = `${currentItem.key[2] === '6' ? 'SH' : 'SZ'}${(secid || '0.002594').slice(2)}`
              }
              const service = 'http://f10.eastmoney.com/NewFinanceAnalysis/DubangAnalysisAjax'
              const urlParams = `code=${code}`
              // http://f10.eastmoney.com/NewFinanceAnalysis/DubangAnalysisAjax?code=SH601012
              const url = `${service}?${urlParams}`
              download(url, data => {
                 console.log('==> 个股年净资产收益率');
                //  res.send(data);
                 const temp = JSON.parse(data)
                 if (!temp.nd) { return }
                 const tempROE = temp.nd || []
                 const formartROE_arr = tempROE.map(item => item.jzcsyl.slice(0, -1))
                 const lastOneYear = formartROE_arr[0]
                 const lastTwoYear = formartROE_arr[1]
                 const lastThreeYear = formartROE_arr[2]
                 /* ROE条件 */
                //  const condition1 = lastOneYear>14&&lastTwoYear>14
                 const condition2 = (lastOneYear / lastTwoYear).toFixed(1) >= 2
                //  console.log('formartROE_arr', formartROE_arr)
                //  console.log('condition1', condition1)
                //  console.log('condition2', condition2)
                 console.log('condition', condition2)

                 resolve(condition2)         
              })
      })

}