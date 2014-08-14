var archive = require('../helpers/archive-helpers');
var path = require('path');
var httpHelp = require('../web/http-helpers');
var fs = require('fs');

var serveUpHTML = function(res, req){
  httpHelp.serveAssets(res, archive.paths.archivedSites+req.url, httpHelp.sendResponse);
};

var serveUpHTMLonPost = function(res, req, url){
  httpHelp.serveAssets(res, archive.paths.archivedSites+"/"+url, httpHelp.sendResponse);
};

var send404 = function(res, req) {
  httpHelp.sendResponse(res, "404", 404)
};



exports.handleRequest = function (req, res) {
  if(req.method === 'GET') {
    if (req.url === "/") {
      httpHelp.serveAssets(res, archive.paths.siteAssets+'/index.html', httpHelp.sendResponse);
    } else {
      archive.isUrlInList(req, res, req.url, serveUpHTML, send404);
    }
  }

  if(req.method === 'POST') {
    var stringed = '';
    req.on('data', function(chunk) {
      stringed += chunk;
    });
    req.on('end', function() {
      var post = stringed.slice(3);
      console.log(post)
      archive.isUrlInList(req, res, post, serveUpHTMLonPost, function() {console.log("error")})
    });
  }
};

// var methodMap = {
//   GET: getArchives,
//   POST: postArchives
// };


