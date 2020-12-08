var superagent = require('superagent'); // 轻量级同构Ajax请求库
var cheerio = require('cheerio');
var url = require('url');

var cnodeUrl = 'https://www.nowcoder.com/discuss'; // 牛客网
// var cnodeUrl = 'https://www.lagou.com/jobs/list_%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91?kd=%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91&spc=1&pl=&gj=&xl=&yx=&gx=&st=&labelWords=label&lc=&workAddress=&city=%E5%85%A8%E5%9B%BD&requestId=&pn=1';

module.exports = function (req, res, next) {
    // 用 superagent 去抓取 https://www.nowcoder.com/discuss 的内容
    superagent
        .get(cnodeUrl)
        .end(function (err, sres) {
            // 常规的错误处理
            if (err) {
                return next(err);
            }
            // sres.text 里面存储着网页的 html 内容
            var $ = cheerio.load(sres.text);
            var items = [];
            $('.discuss-main').each(function (idx, element) {
                var $element = $(element);
                items.push({
                    title: $element.find('a').text(),
                    href: $element.find('a').attr('href'),
                    link: url.resolve(cnodeUrl, $element.find('a').attr('href'))
                });
            });
            console.log(items)
            res.send(items);
        })
}
