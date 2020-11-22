var http = require("http");

/* 调取其他接口数据 */
module.exports = function download(url, callback) {
    http.get(url, function (res) {
      var data = "";
      res.on('data', function (chunk) {
        data += chunk;
      });
      res.on("end", function () {
        callback(data);
      });
    }).on("error", function () {
      callback(null);
    });
}
  