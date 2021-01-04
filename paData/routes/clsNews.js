
/* 财联社电报 */
var download = require("../utils/http");

module.exports = function (req, res) {
    const updateTime = String(Date.now()).slice(0, -3) * 1
    // const updateTime = String(new Date('2021-01-02 23:59').getTime()).slice(0, -3) * 1 // 制定最新时间，向过去时间截取
    const { size = 400, lastTime = updateTime, last_time = updateTime } = req.query;
    const service = 'https://www.cls.cn/nodeapi/telegraphList'
    const urlParams = `app=CailianpressWeb&category=&lastTime=${lastTime}&last_time=${last_time}&os=web&refresh_type=1&rn=${size}&sv=7.5.5&sign=19c471a4f20e1190c4e4c18ddffb657d`

    const url = `${service}?${urlParams}`
    console.log(url)
    download(url, data => {
        const formatD = JSON.parse(data)
        // data = JSON.parse(data).data.roll_data[0].content
        const condition = "item.content.search('比亚迪') !== -1 || item.author_extends.search('华友钴业') !== -1 || item.author_extends.search('王府井') !== -1"
        const temp = formatD.data.roll_data.filter(item => eval(condition))
        data = JSON.stringify(formatD)
        res.send(data);
        console.log(formatD.data, `duqu--${formatD.data.roll_data.length}--获取财联社数据成功！`)
      }, 1)
}