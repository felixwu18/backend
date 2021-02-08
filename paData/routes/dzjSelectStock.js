
/* 个股最新价格 服务端请求数据 */
var axiosFetch = require("../utils/axiosRequest");
var download = require("../utils/http");
// const configsAllP = require('../data/HSAFormat') // 沪深A 4250
// const configsAllP = require('../data/syhh12-19') // syhh12-19
const configsAllP = require('../data/dzjSelect-01-24') // dzjSelect-01-24

// const configsAllP = require('../data/bankuaiParts/食品饮料') // 板块类股
var fs = require("fs"); //文件模块

/* 工具函数 */
const codeToSecid = require('../utils/codeToSecid')

// const stockCashFlowWatch = require('./dzjLatest') // 个股资金流向

module.exports = function (req, res) {
              /* _ 更新最新数据 沪深A 4250 只  po升降序指标 fid 排序参考指标*/
              const finalSelects = []
              const writePath = 'H:\\stock\\backend\\paData\\data\\dzjSelect-01-24-精选.js'; //生成文件
              // configsAllP.forEach((item, index) => {
                  configsAllP.slice(1151).forEach((item, index) => {
              // var aa = [{ "key": "0.002648", "value": "卫星石化", "marketT": "sz" }]
              // aa.forEach((item, index) => {
                            //         console.log(`${item.key}--${item.value}--${index}`)
                            setTimeout(() => {
                                          const secid = item.key
                                          const service = 'http://127.0.0.1:4000/dzjLatest'
                                          const urlParams = `secid=${secid}`
                                          const url = `${service}?${urlParams}`
                                          download(url, resp => {
                                                        console.log(`${item.key}--${item.value}--${index}`);
                                                        !resp && console.log(resp, 'resp')
                                                        const data = JSON.parse(resp)
                                                        // res.send(JSON.stringify(data.sdgd));
                                                        // console.log(data.sdgd, '==> 最新个股大资金情况查询成功');
                                                        let consditon = false
                                                        if (!data.sdgd) { return }
                                                        data.sdgd.find((item, index) => { // 每一期
                                                                      // const findTarget = item.sdgd.find(gdObj => gdObj.gdmc === '香港中央结算有限公司' && gdObj.zj.search('-') === -1)
                                                                      // if (findTarget) {
                                                                      //               consditon = true
                                                                      // }
                                                                      /* 精选 */
                                                                      if([0, 1].includes(index)) {
                                                                         const findTarget = item.sdgd.find(gdObj => gdObj.gdmc === '香港中央结算有限公司' && gdObj.zj.search('-') === -1 && (gdObj.zj === '新进' || gdObj.bdbl.slice(0,-1) * 100 > 50 * 100))       
                                                                         if (findTarget) {
                                                                                    consditon = true
                                                                      }
                                                                      }
                                                        })

                                                        if (consditon) {
                                                                      finalSelects.push(item)
                                                        }
                                                        /* 最后写入 */
                                                        if (configsAllP.length === index + 1) {
                                                                      fs.writeFile(writePath, JSON.stringify(finalSelects), function (err, m) {
                                                                                    console.log('==>finalSelects写入数据')
                                                                      }); //将文件写入磁盘
                                                        }
                                          })
                            }, 300 * index)
              })

              /* 定时取数据 */
              // let writePath = 'H:\\stock\\backend\\paData\\data\\dzjSelect-01-24.js'; //生成文件
              setInterval(() => {
                            console.log(finalSelects, `====${finalSelects.length}===>finalSelects`)
              }, 1000 * 3);

              //将文件写入磁盘
              // setTimeout(() => {
              //     console.log(finalSelects, '==>finalSelects')
              //     fs.writeFile(writePath, JSON.stringify(finalSelects), function (err, m) {
              //         console.log('==>finalSelects写入数据')
              //     }); //将文件写入磁盘
              // }, 1000 * 2);



              // download(url, data => {
              //     const temp = []
              //     const parseD = JSON.parse(data).data.diff
              //     /* 根据部分条件过滤 */
              //     parseD.forEach(item => {
              //         if(item.f14[0] === '博' && item.f14[3] === '技' && item.f3 > 2) {
              //            temp.push(item)
              //         }
              //     })
              //     /* 形态 上升三方 */
              //     // if (xtxg == 'sssf') {
              //     //     parseD.forEach(item => {
              //     //         if(item.f14[0] === '博' && item.f14[3] === '技' && item.f3 > 2) {
              //     //            temp.push(item)
              //     //         }
              //     //     })
              //     // }
              //   console.log(temp)
              //   res.send(data);
              // })

              /* 读取本地文件 */
              // var file = path.join(__dirname, 'data/20201206HSA.json'); //文件路径，__dirname为当前运行js文件的目录
              // //var file = 'f:\\nodejs\\data\\test.json'; //也可以用这种方式指定路径
              // console.log(file)
              // fs.readFile('./data/20201206HSA.json','utf-8', (err, data) => {
              //     if (err) {
              //         res.send('文件读取失败');
              //         console.log(err)
              //     } else {
              //         // console.log(data)
              //         res.send(data);
              //     }
              // });
}