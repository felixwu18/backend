var superagent = require('superagent'); // 轻量级同构Ajax请求库
var cheerio = require('cheerio');
var url = require('url');
var page = 1
var cnodeUrl = `http://data.10jqka.com.cn/ajax/yjyg/date/2021-06-30/board/ALL/field/enddate/order/desc/page/${page}/ajax/1/free/1/`; // 牛客网
// var cnodeUrl = 'http://data.10jqka.com.cn/financial/yjyg/'; // 牛客网
// var cnodeUrl = 'https://www.lagou.com/jobs/list_%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91?kd=%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91&spc=1&pl=&gj=&xl=&yx=&gx=&st=&labelWords=label&lc=&workAddress=&city=%E5%85%A8%E5%9B%BD&requestId=&pn=1';
function decode(str) {
    return str.replace(/&#(\d+);/g, function(match, dec) {
        return String.fromCharCode(dec);
    });
}

module.exports = async function (req, res, next) {
    // 用 superagent 去抓取 https://www.nowcoder.com/discuss 的内容
    let items = []
    for (let index = 0; index < 1; index++) {
        page = index + 1
        const data  = await handleRequest(res, next, cnodeUrl)
        items.push(data)
    }
    res.send(items);
}

function handleRequest(res, next, cnodeUrl) {
    return new Promise((resolve) => {
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
                items.push({
                    index: $element.find('td:nth-child(1)').text(),
                    stockCode: $element.find('.stockCode').text(),
                    stockName: $element.find('.J_showCanvas').text(),
                    riseOrFall: $element.find('td:nth-child(4)').text(),
                    persent: $element.find('td:nth-child(6)').text().replace(/[^0-8, .]/g, '').trim(),
                    earnings: $element.find('td:nth-child(7)').text().replace(/\ufffd\ufffd/g, ''),
                    date: $element.find('td:nth-child(8)').text(),
                    // link: url.resolve(cnodeUrl, $element.find('a').attr('href'))
                });
            });
            // res.send(items);
            resolve(items)
        })
    })
}