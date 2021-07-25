var superagent = require('superagent'); // 轻量级同构Ajax请求库
var cheerio = require('cheerio');
var url = require('url');
var fs = require("fs"); //文件模块
const configsAllP = require('../../data/HSAFormat') // 沪深A 4250



var cnodeUrl = 'http://data.10jqka.com.cn/financial/yjyg/'; // 牛客网
// var cnodeUrl = 'http://data.10jqka.com.cn/ajax/yjyg/date/2021-06-30/board/ALL/field/enddate/order/desc/page/3/ajax/1/free/1/'; // 牛客网

module.exports = function (req, res, next) {
    const writePath = `F:\\stock\\backend2\\paData\\data\\goodEarnings\\goodStock1.js`; //生成目录文件
    // 用 superagent 去抓取 https://www.nowcoder.com/discuss 的内容
    superagent
        .get(cnodeUrl)
        // .set('charset','utf-8')
        .end(function (err, sres) {
            // 常规的错误处理
            if (err) {
                return next(err);
            }
            // sres.text 里面存储着网页的 html 内容
            var $ = cheerio.load(sres.text);
            var items = [];
            $('tbody tr').each(function (idx, element) {
                var $element = $(element);

                const stockCode = $element.find('.stockCode').text()
                const currentItem = configsAllP.find(item => item.key.slice(2) === stockCode) || {}

                items.push({
                    index: $element.find('td:nth-child(1)').text(),
                    stockCode: $element.find('.stockCode').text(),
                    stockName: currentItem.value,
                    // riseOrFall: $element.find('td:nth-child(4)').text(),
                    persent: $element.find('td:nth-child(6)').text().replace(/[^0-8, .]/g, '').trim(),
                    earnings: $element.find('td:nth-child(7)').text().replace(/\ufffd\ufffd/g, ''),
                    date: $element.find('td:nth-child(8)').text(),
                    // link: url.resolve(cnodeUrl, $element.find('a').attr('href'))
                });
            });
            res.send(items);

            /* 将文件写入磁盘 */
            const file = `module.exports = ${JSON.stringify(items)}`;
            fs.writeFile(writePath, file, function (err, m) {
                console.log(err, m, `err--m-goodStock--写入成功！`)
            });
        })
}
