//var url = require('url');
var http = require("http");
var handler = require("./request-handler");

var port = 8080;
var ip = "127.0.0.1";

// var urlMap = {
//   '/': handler.handleRequest,
// }

var server = http.createServer(handler.handleRequest);
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);

// function(req, res) {
//   var parsedUrl = url.parse(req.url);
//   var result = urlMap[parsedUrl];
//   if (result) {
//     result(req, res);
//   } else {
//     //return error
//   }
// }
