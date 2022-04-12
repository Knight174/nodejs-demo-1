import * as http from "http";
import { IncomingMessage, ServerResponse } from "http";
import * as fs from "fs";
import * as p from "path";
import * as url from "url"; // url 模块

const server = http.createServer();
const publicDir = p.resolve(__dirname, "public"); // public 文件夹路径

server.on("request", (request: IncomingMessage, response: ServerResponse) => {
  const { method /* 请求方法 */, url: request_path /* 路径 */, headers /* 请求头 */ } = request;

  // http://nodejs.cn/api/url.html#url
  console.log(url.parse(request_path) /* 旧方案：用 url.parse(request_path) 解析请求的路径 */);
  // console.log(new URL(req_path) /* 新方案 */);

  const { pathname, search } = url.parse(request_path);

  switch (pathname) {
    case "/index.html":
      response.setHeader("Content-Type", "text/html; charset=utf-8"); // 设置请求头-内容类型
      fs.readFile(p.resolve(publicDir, "index.html"), (err, data) => {
        if (err) throw err;
        response.end(data.toString());
      });
      break;
    case "/style.css":
      response.setHeader("Content-Type", "text/css; charset=utf-8"); // 设置请求头-内容类型
      fs.readFile(p.resolve(publicDir, "style.css"), (err, data) => {
        if (err) throw err;
        response.end(data.toString());
      });
      break;
    case "/main.js":
      response.setHeader("Content-Type", "text/javascript; charset=utf-8"); // 设置请求头-内容类型
      fs.readFile(p.resolve(publicDir, "main.js"), (err, data) => {
        if (err) throw err;
        response.end(data.toString());
      });
      break;
    default: // 其他情况下，http 状态码置为 404，且什么也不返回
      response.statusCode = 404;
      response.end();
  }
});

server.listen(8888);
