/* 阴阳互换 大阴战法 大跌第二天收盘选股 */
module.exports = function yyhhSelect(data) {
    if(typeof data !== 'object') { return }
    const latest2DaysP = data.slice(0, 2) // 时间降序
    const spjArr = latest2DaysP.map(item => item.split(',')[8]) // 涨跌幅
    const condition1 = spjArr[1] < -6 && spjArr[1] > -10 // 大阴线
    const condition2 = spjArr[0] > 0 && spjArr[0] < 3 // 大跌第二天小阳线企稳
    // console.log(latest2DaysP, '=====>latest2DaysP')
    // console.log(spjArr, '=====>spjArr')
    // console.log(condition1, '=====>condition1')
    // console.log(condition2, '=====>condition2')
    return condition1&&condition2
}
