/* 更新后台数据脚本 */
var axios = require("axios");
const updateList = require('./paData/data/fenshi/names/index')

const configsAllP = require('./paData/data/HSAFormat') // 沪深A 4250
console.log(updateList, `updateList----${updateList.length}---`)

updateList.forEach((name, index) => {
    // updateList.slice(130).forEach((name, index) => {
    setTimeout(() => {
        const currentItem = configsAllP.find(item => item.value === name) || {}
        console.log(currentItem.key, `===>${index}`)
        if (currentItem.key) {
            update(currentItem.key)
        }
    }, 2200 * index)
})

// /* 特殊情况 遗漏再更新 */
// const keys = ['1.600019', '0.000858']
// keys.forEach((key, index) => {
//     setTimeout(() => {
//             update(key)
//     }, 2200 * index)
// })


/* 最新分时间推送后台 */
function pushLatestFSP(params = {}) {
    const url = `http://127.0.0.1:4000/setCacheFSP`
    axios.post(url, params)
        .then(res => {
            const data = res.data
            console.log(data) // 写入成功时打印提示
        })
        .catch(err => {
            console.error(err, 'pushLatestFSP--err')
        })
}
// /* 缓存半年个股最新价格数据 */
// function setCacheData(params = {}) {
//     const url = `http://127.0.0.1:4000/setCache120Day`
//     axios.post(url, params)
//         .then(res => {
//             const data = res.data
//         })
//         .catch(err => {
//             console.error(err)
//         })
// }

/* 分时价查询 三方接口 */
function getFSP(params = {}) {
    return new Promise((resolve => {
        const queryStr = objToUrlParamss(params)
        axios.get(`http://127.0.0.1:4000/fenshiLatestP?${queryStr}`)
            .then(res => {
                const data = res.data.trends
                // console.error(data, '===>三方最新分时数据')
                resolve(data)
            })
            .catch(err => {
                console.error(err, 'getFSP--err')
            })
    }))
}
/* 分时价查询 后台缓存数据接口 */
function getCacheFSP(params = {}) {
    return new Promise((resolve => {
        const queryStr = objToUrlParamss(params)
        axios.get(`http://127.0.0.1:4000/getCacheFSP?${queryStr}`)
            .then(res => {
                const data = res.data
                resolve(data)
            })
            .catch(err => {
                console.error(err, 'getCacheFSP--err')
            })
    }))
}
/* 同步三方分时价 */
function mergeFSP({ resFSP, cacheFSP }) {
    const concatArr = cacheFSP.concat(resFSP)
    const formartTrends = [] // 二维数组，分时数据一天为一个数组
    const fsDaysCount = concatArr.length / 241
    for (let index = 0; index < fsDaysCount; index++) {
        formartTrends.push(concatArr.slice(index * 241, 241 * (index + 1)))
    }
    // const resFSP_reverse = JSON.parse(JSON.stringify(resFSP)).reverse() // 三方
    // const cacheFSP_reverse = JSON.parse(JSON.stringify(cacheFSP)).reverse() // 后台
    return unique(formartTrends)
}

/* 对象参数转路径参数 */
function objToUrlParamss(obj) {
    let str = ''
    Object.keys(obj).forEach(key => {
        str += `${key}=${obj[key]}&`
    })
    return str.slice(0, -1)
}
/* 去重 */
function unique(arr) {
    if (!arr) { return }
    const signObj = {}
    const uniqueArr = []
    arr.forEach(item => {
        if (!signObj[item[0].slice(0, 10)]) {
            signObj[item[0].slice(0, 10)] = 1
            uniqueArr.push(...item) // 二维数组打平
        }
    })
    return uniqueArr
}

async function update(secid) {
    let resFSP = await getFSP({ secid, ndays: 5 }); // 时间降序

    // /* 特殊情况 */
    // let resFSP = '1'
    let cacheFSP = await getCacheFSP({ secid, });  // 时间降序
    if (cacheFSP === '文件读取失败' || cacheFSP === '') {
        console.log('没有缓存数据, 同步缓存最新数据', secid)
        pushLatestFSP({
            secid,
            data: resFSP
        })
    } else {
        // /* 特殊情况 */
        // const year = new Date().getFullYear()
        // const mounth = new Date().getMonth() + 1
        // const day = new Date().getDate()
        // const nowDate = `${year}-${String(mounth).length === 1 ? 0 + String(mounth) : mounth}-${day}`
        // if ([1, 2, 3, 4, 5].includes(new Date().getDay()) && nowDate === cacheFSP.slice(-1)[0].slice(0, 10)) {
        //     console.log('已更新')
        // } else {

        // let resFSP = await  getFSP({ secid, ndays: 5 }); // 时间降序
        if (resFSP.slice(-1)[0].slice(0, 10) !== cacheFSP.slice(-1)[0].slice(0, 10)) { // 最新数据一样，不处理
            resFSP = mergeFSP({ resFSP, cacheFSP }) // 同步三方重写
            if (!resFSP) { return }
            /* 同步推送后台 */
            pushLatestFSP({
                secid,
                data: resFSP
            })
        }

        // }
    }
}