const http = require("node:http");
const fs = require("node:fs");

// 通过 fs.readFileSync 可读取文件内容
const html = fs.readFileSync("./index.html");
const filePath = "./index.html"; // 文件路径

const server = http.createServer((req, res) => {
  // 此处需要手动处理下 Content-Length
  const stat = fs.statSync(filePath); // 获取文件状态信息
  const fileSize = stat.size; // 获取文件大小

  res.writeHead(200, {
    "Content-Length": fileSize, // 设置 Content-Length
    "Content-Type": "text/html", // 设置文件类型
  });

  const readStream = fs.createReadStream(filePath); // 创建文件读取流
  readStream.pipe(res); // 将文件读取流通过管道传输到响应流
});
server.listen(3000, () => {
  console.log("Listening 3000");
});
