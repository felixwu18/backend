
/* 财联社电报 */
var download = require("../utils/http");

module.exports = function (req, res) {
    const updateTime = String(Date.now()).slice(0, -3) * 1
    const { size = 20, lastTime = updateTime, last_time = updateTime } = req.query;
    const service = 'https://www.cls.cn/nodeapi/telegraphList'
    const urlParams = `app=CailianpressWeb&category=&lastTime=${lastTime}&last_time=${last_time}&os=web&refresh_type=1&rn=${size}&sv=7.5.5&sign=19c471a4f20e1190c4e4c18ddffb657d`

    const url = `${service}?${urlParams}`
    download(url, data => {
        res.send(data);
        const formatD = JSON.parse(data)
        console.log(formatD.data.roll_data[0], `duqu--${formatD.data.roll_data.length}--获取财联社数据成功！`)
      }, 1)
}