/* 更新后台数据脚本 */
var axios = require("axios");
const updateList = require('./paData/data/fenshi/names/index')
const qs = require('qs')
var fs = require("fs"); //文件模块

const configsAllP = require('./paData/data/HSAFormat') // 沪深A 4250
console.log(updateList, `updateList----${updateList.length}---`)
const writeFailArr = []

updateList.forEach((name, index) => {
     // updateList.slice(100).forEach((name, index) => {
     setTimeout(() => {
          const currentItem = configsAllP.find(item => item.value === name) || {}
          console.log(currentItem.key, `===>${index}`)
          if (currentItem.key) {
               update(currentItem)
          }
        /* 最后将更新失败的列出 */
        if (updateList.length === index + 1) {
          console.log(writeFailArr, `failWritStock<=== ${writeFailArr.length}`) 
      }
   }, 4000 * index)
})

// /* 特殊情况 遗漏再更新 */
// // const keys = ['0.002610', '0.002747']
// const values = [ '德赛电池' ]
// const items = values
// console.log(items, `itemsList----${items.length}---`)
// items.forEach((name, index) => {
//      setTimeout(() => {
//           const currentItem = configsAllP.find(item => item.value === name) || {}
//           console.log(currentItem.key, `===>${index}`)
//           update(currentItem)
//      }, 3000 * index)
// })

async function update({ key: secid, value }) {
     try {
          let res = await getLatestP({ secid, value });  // 时间降序
          if (!res.data) { console.log(`数据请求异常！---${secid}---res`); return }
          console.log(res.data.data.name, '--查询ok, 最新个股latestP----res')
          setCacheData({
               secid,
               data: res
          })
     } catch (error) {
          console.log(error, 'error')
     }
}

/* 缓存半年个股最新价格数据 推送后台 */
function setCacheData(params = {}) {
     const { secid, data: { data: res } } = params
     const currentItem = configsAllP.find(currentItem => currentItem.key === secid)
     // console.log(secid, '推送活后台-1----secid----------------')
     // console.log(res, '推送活后台2---data:res---------')

     /* 直接写入 */
     if (!res.data || !res.data.name) { return }
     // resp.send(res)
     const file = `module.exports = ${JSON.stringify(res)}`;
     const fileName = currentItem.value
     let writePath = `F:\\stock\\backend\\paData\\data\\latestP\\${fileName}.js`; //生成目录
     // console.log(res, 'res <=======')
     fs.writeFile(writePath, file, (err, m) => {
          // resp.send('写入成功！')
          // resp.send(`${fileName}--lataetP缓存写入成功`)
          console.log(err, m, `err--m-${fileName}lataetP缓存写入成功！`)
          console.log(`-----------------------------------------------------------------------------------${"\n"}`)
     }); //将文件写入磁盘






     /* 请求暂时不用 */
     //     const url = `http://127.0.0.1:4000/setCache120Day`
     //     axios.post(url, params)
     //          .then(res => {
     //                console.log('推送活后台2')
     //                const data = res.data
     //          })
     //          .catch(err => {
     //                console.error(err, 'er-----')
     //          })
}


/* 对象参数转路径参数 */
function objToUrlParamss(obj) {
     let str = ''
     Object.keys(obj).forEach(key => {
          str += `${key}=${obj[key]}&`
     })
     return str.slice(0, -1)
}


// function getLatestP(params = {}) {
//               params = { updateTime: Date.now(), ...params }
//               // const queryStr = qs.stringify(params)
//               const queryStr = objToUrlParamss(params)
//               return axios.get(`http://127.0.0.1:4000/latestP?${queryStr}`)
// }
function getLatestP({ secid, value }) {
     return new Promise((resolve => {
          params = { updateTime: Date.now(), secid }
          // const queryStr = qs.stringify(params)
          const queryStr = objToUrlParamss(params)
          const url = `http://127.0.0.1:4000/latestP?${queryStr}`
          console.log(url, 'request url-----')
          axios.get(url)
               .then(res => {
                    // const data = res.data.trends
                    // console.log(res, '===>三方最新个股价格数据')
                    resolve(res)
               })
               .catch(err => {
                    console.error(err, `--${value}--getlatestP--err`)
                    writeFailArr.push(value)
                    console.log(writeFailArr, `failWritStock<=== ${writeFailArr.length}`)
                    console.log(`-----------------------------------------------------------------------------------${"\n"}`)
               })
     }))
}

