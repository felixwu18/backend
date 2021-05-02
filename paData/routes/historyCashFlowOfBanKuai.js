
/* 板块历史资金流 */
var download = require("../utils/http");


module.exports = async function (req, res) {
    const secid1 = 'BK0889'
    const secid2 = 'BK0465'
    const secid3 = 'BK0802'
    // requestData(secid1, res)
    // requestData(secid2, res)
    // requestData(secid3, res)
    Promise.all([requestData(secid1, res), requestData(secid2, res), requestData(secid3, res)])
      .then(resultList => {
        console.log('==> 板块历史资金流查询ok!');
        res.send(resultList)
      })
      .catch((error) => {
        console.log(error)
      });
  }

  function requestData(secid, res) {
    return new Promise((resolve => {
      /*secid id   _ 更新最新数据*/
      const _ = Date.now() // 更新
      // const { secid = 'BK0465', updateTime: _ = updateTime } = query;
      const service = 'http://push2his.eastmoney.com/api/qt/stock/fflow/daykline/get'
      const urlParams = `&lmt=0&klt=101&fields1=f1%2Cf2%2Cf3%2Cf7&fields2=f51%2Cf52%2Cf53%2Cf54%2Cf55%2Cf56%2Cf57%2Cf58%2Cf59%2Cf60%2Cf61%2Cf62%2Cf63%2Cf64%2Cf65&ut=b2884a393a59ad64002292a3e90d46a5&secid=90.${secid}&_=${_}`
      // http://push2his.eastmoney.com/api/qt/stock/fflow/daykline/get?cb=jQuery1123005075426240570513_1611245703811&lmt=0&klt=101&fields1=f1%2Cf2%2Cf3%2Cf7&fields2=f51%2Cf52%2Cf53%2Cf54%2Cf55%2Cf56%2Cf57%2Cf58%2Cf59%2Cf60%2Cf61%2Cf62%2Cf63%2Cf64%2Cf65&ut=b2884a393a59ad64002292a3e90d46a5&secid=0.002594&_=1611245703812
      // http://push2his.eastmoney.com/api/qt/stock/fflow/daykline/get?cb=jQuery1123010141464991732918_1619963599068&lmt=0&klt=101&fields1=f1%2Cf2%2Cf3%2Cf7&fields2=f51%2Cf52%2Cf53%2Cf54%2Cf55%2Cf56%2Cf57%2Cf58%2Cf59%2Cf60%2Cf61%2Cf62%2Cf63%2Cf64%2Cf65&ut=b2884a393a59ad64002292a3e90d46a5&secid=90.BK0465&_=1619963599069

      const url = `${service}?${urlParams}`
      download(url, data => {
        // res.send(data);
        const temp = JSON.parse(data)
        if(temp.data) {
          resolve(JSON.stringify(temp.data))
        }
      })
    }))
  }