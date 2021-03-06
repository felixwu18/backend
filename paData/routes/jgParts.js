
/* 版块成分股接口 */
var axios = require("axios");
// const configsAllP = require('../data/HSAFormat') // 沪深A 4250
// const codeToSecid = require('../utils/codeToSecid') // 工具函数
var fs = require("fs"); //文件模块


module.exports = function (req, res) {
    const bankuaiFileName = '人工智能'
    const writePath = `F:\\stock\\backend\\paData\\data\\bankuaiParts\\${bankuaiFileName}.js`; //生成目录文件
    const { size = 300, current = 1, bkid = 'BK0800', updateTime: _ = Date.now() } = req.query;
    /* 机构持仓个股 */
    // http://dcfm.eastmoney.com//em_mutisvcexpandinterface/api/js/get?type=NSHDDETAIL&token=70f12f2f4f091e459a279469fe49eca5&cmd=&st=RDATE,NDATE&sr=3&p=2&ps=50&filter=(SHAREHDCODE=%2780195926%27)&js={pages:(tp),data:(x)}
    // const service = 'http://dcfm.eastmoney.com//em_mutisvcexpandinterface/api/js/get'
    // const urlParams = `type=NSHDDETAIL&token=70f12f2f4f091e459a279469fe49eca5&cmd=&st=RDATE,NDATE&sr=3&p=2&ps=50&filter=(SHAREHDCODE=%2780195926%27)&js={pages:(tp),data:(x)}`

    /* 行业板块分类 61 */
    // const service = 'http://83.push2.eastmoney.com/api/qt/clist/get'
    // const urlParams = `pn=1&pz=61&po=0&np=1&ut=bd1d9ddb04089700cf9c27f6f7426281&fltt=2&invt=2&fid=f3&fs=m:90+t:2+f:!50&fields=f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f33,f11,f62,f128,f136,f115,f152,f124,f107,f104,f105,f140,f141,f207,f208,f209,f222&_=1607849430814`

    /* 概念版块分类 285 */
    // const service = 'http://46.push2.eastmoney.com/api/qt/clist/get'
    // const urlParams = `pn=1&pz=285&po=1&np=1&ut=bd1d9ddb04089700cf9c27f6f7426281&fltt=2&invt=2&fid=f3&fs=m:90+t:3+f:!50&fields=f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f33,f11,f62,f128,f136,f115,f152,f124,f107,f104,f105,f140,f141,f207,f208,f209,f222&_=1607758746440`
    
    const url = `${service}?${urlParams}`
    axios.get(url)
        .then(data => {
            const resData = codeToSecid(data.data.data.diff, 1)
            res.send(resData);
            /* 将文件写入磁盘 */
            const file = `module.exports = ${JSON.stringify(resData)}`;
            fs.writeFile(writePath, file, function (err, m) {
                console.log(err, m, `err--m-${bankuaiFileName}--版块成分股缓存写入成功！`)
            });
        })
        .catch(err => {
            console.error(err)
        })
}