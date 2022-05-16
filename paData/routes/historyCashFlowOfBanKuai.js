
/* 板块历史资金流 */
var download = require("../utils/http");

const arr1 = [
  // 'BK0478', // 有色
  // 'BK0437', // 煤炭
  // 'BK0479', // 钢铁
  'BK0428', // 电力
]
const arr2 = [
  // 'BK0917', // 半导体 
  // 'BK0574', // 锂电池 
  // 'BK1031', // 光伏设备 
  // 'BK0588', // 太阳能 光伏
  // 'BK0978', // 光伏建筑一体化
  // 'BK0864', // 氢能源 
  'BK0981', // 工业气体 
  // 'BK0595', // 风能 
]
const arr3 = [
  'BK1031', // 光伏设备 
  // 'BK0481', // 汽车行业
  // 'BK0456', // 家电行业
  // 'BK0538', // 化工行业
  // 'BK0471', // 化纤行业
]
const arr4 = [
  'BK1024', // 绿色电力
  // 'BK0737', // 软件服务
  // 'BK0459', // 电子元件
  // 'BK0953', // 鸿蒙概念
  // 'BK0908', // HIT电池
]
const arr5 = [
  // 'BK0465', // 医药
  // 'BK0615', // 中药
  // 'BK0477', // 酿酒行业
  // 'BK0438', // 食品饮料
  'BK0882', // 猪肉概念
  // 'BK0547', // 黄金概念
  // 'BK0473', // 券商信托
]

module.exports = async function (req, res) {
    const secid1 = arr1[0]
    const secid2 = arr2[0]
    const secid3 = arr3[0]
    const secid4 = arr4[0]
    const secid5 = arr5[0]
    // requestData(secid1, res)
    // requestData(secid2, res)
    // requestData(secid3, res)
    Promise.all([requestData(secid1, res), requestData(secid2, res), requestData(secid3, res), requestData(secid4, res), requestData(secid5, res)])
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