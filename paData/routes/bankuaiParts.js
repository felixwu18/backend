
/* 版块成分股接口 */
var axios = require("axios");
const configsAllP = require('../data/HSAFormat') // 沪深A 4250

var fs = require("fs"); //文件模块


module.exports = function (req, res) {
    const writePath = 'H:\\stock\\backend\\paData\\data\\bankuaiParts\\食品饮料.js'; //生成目录文件
    const { size = 203, current = 1, bkid = 'BK0438', updateTime: _ = Date.now() } = req.query;
    /* 板块个股 */
    const service = 'http://46.push2.eastmoney.com/api/qt/clist/get'
    const urlParams = `pz=${size}&np=1&ut=bd1d9ddb04089700cf9c27f6f7426281&fltt=2&invt=2&pn=${current}&po=1&fid=f3&fs=b:${bkid}+f:!50&fields=f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f22,f11,f62,f128,f136,f115,f152,f45&_=${_}`

    /* 行业板块分类 61 */
    // const service = 'http://83.push2.eastmoney.com/api/qt/clist/get'
    // const urlParams = `pn=1&pz=61&po=0&np=1&ut=bd1d9ddb04089700cf9c27f6f7426281&fltt=2&invt=2&fid=f3&fs=m:90+t:2+f:!50&fields=f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f33,f11,f62,f128,f136,f115,f152,f124,f107,f104,f105,f140,f141,f207,f208,f209,f222&_=1607849430814`

    /* 概念版块分类 285 */
    // const service = 'http://46.push2.eastmoney.com/api/qt/clist/get'
    // const urlParams = `pn=1&pz=285&po=1&np=1&ut=bd1d9ddb04089700cf9c27f6f7426281&fltt=2&invt=2&fid=f3&fs=m:90+t:3+f:!50&fields=f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f33,f11,f62,f128,f136,f115,f152,f124,f107,f104,f105,f140,f141,f207,f208,f209,f222&_=1607758746440`
    
    const url = `${service}?${urlParams}`
    console.log(url)
    axios.get(url)
        .then(data => {
            const resData = data.data.data
            console.log(data.data)
            // const temp = configsAllP.filter(configitem => {
            //     return resData.diff.find(stock => configitem.key.search(stock.f12) !== -1)
            // }) || []
            res.send(resData);
            // console.log(temp.length)
            // console.log(resData.diff.length)
            /* 将文件写入磁盘 */
            const temp = resData.diff.map(stock =>({key: stock.f12, value: stock.f14}))
            fs.writeFile(writePath, JSON.stringify(temp), function (err, m) {
                console.log(err, m)
            });
        })
        .catch(err => {
            console.error(err)
        })
}