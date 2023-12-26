import * as http from 'http';
const server = http.createServer(function(req, res, next) {
  res.writeHead(200, { "Content-type": "text/html" });
  res.write("<h1>Hello World!</h1>");
  return res.end();
});
server.listen(3000, function() {
  console.log("Go to localhost:3000");
});