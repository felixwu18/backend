/* latestP 缓存120天数据 */
var fs = require("fs"); //文件模块
const configsAllP = require('../../data/HSAFormat'); // 沪深A 4250
// const configsAllP = require('../../data/goodEarnings/goodStock-100点2'); // 沪深A 4250

module.exports = function (req, resp) {
    resp.send('lataetP写入开始中...！')
    // const datadata = []
    // 降序
    function compare(a1,a2){
        return a2.persent-a1.persent;
    }
    const datadata = configsAllP.sort(compare)
    // configsAllP.forEach((currentItem, index) => {
        // const file = `module.exports = ${JSON.stringify(req.body)}`;
        // 写入符合要求数据
        // if(!(currentItem.persent < 100)&&currentItem.persent !=='-'&&currentItem.stockName.indexOf('*ST') === -1&&currentItem.stockName.indexOf('ST') == -1) { 
        //     datadata.push(currentItem)
        // }
        // console.log(index, 'index');
            const file = `module.exports = ${JSON.stringify(datadata)}`;
            const writePath = `F:\\stock\\backend2\\paData\\data\\goodEarnings\\goodStock-100点3.js`; //生成目录文件
            console.log(req.body, 'res <=======')
            fs.writeFile(writePath, file, (err, m) => {
                console.log(err, m, `err--m-业绩报个股缓存写入成功！`)
            }); //将文件写入磁盘
        // if(index === 1056) {
        //     const file = `module.exports = ${JSON.stringify(datadata)}`;
        //     const writePath = `F:\\stock\\backend2\\paData\\data\\goodEarnings\\goodStock-100点2.js`; //生成目录文件
        //     console.log(req.body, 'res <=======')
        //     fs.writeFile(writePath, file, (err, m) => {
        //         console.log(err, m, `err--m-业绩报个股缓存写入成功！`)
        //     }); //将文件写入磁盘
        // }
    // })
}

/**
 * 控制台post请求
 * 
 * // 节点中获取数据
   var list = document.querySelectorAll('tbody tr')
   var datadata = Array.from(list).map(ele => 
    ({ index: ele.innerText.split('\t')[0], 
        code: ele.innerText.split('\t')[1], 
        stockName: ele.innerText.split('\t')[2], 
        upDown: ele.innerText.split('\t')[3], 
        persent: ele.innerText.split('\t')[5], 
        ravenue: ele.innerText.split('\t')[6], 
        date: ele.innerText.split('\t')[7] })
        )
      // 将节点获取的格式化数据发送后台
   var result = fetch('http://127.0.0.1:4000/pagePC2FromConsole',{
        method:'POST',
        headers: {
              'Content-Type': 'application/json'
          },
        body:JSON.stringify(datadata) //将参数转换为字符串传入后台
    });
       result
           .then(function(res){
                return res.text();
            })
           .then(function(text){
               console.info(text);
            });
 * 
 * 
 */