
/* 分时价查询 */
const fenshiQuery = require('../utils/fenshiQuery') // 分时价查询


module.exports = function (req, res) {
    /*secid id   _ 更新最新数据*/
    const { secid = '0.002594' } = req.query;
    fenshiQuery({ secid })
            .then(resData => {
                console.log(resData, 'resData');
                res.send(resData)
            })
            .catch(err => {
                console.error(err)
            })
  }