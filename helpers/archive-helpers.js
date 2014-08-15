var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var httpHelp = require('../web/http-helpers');
var request = require('request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(){
  fs.readFile(exports.paths.list, function(err, data) {
    if (err) {throw err;};
    return data;
  })

};


exports.isUrlInList = function(req, res, url, successCallback, errorCallback){ //success callback, error callback
  var result = url.slice(1);
  var stringData = "";
  fs.readFile(exports.paths.list, function(err, data) {
    if (err) {console.log( err);};
    var stringed = data + ''
    stringData += stringed;
    if (stringData.indexOf(result) !== -1) {
      // httpHelp.serveAssets(res, exports.paths.archivedSites+req.url, httpHelp.sendResponse);
      // invoke some callback function with value true
      //callback()
      successCallback(res, req, result);
    } else {
      errorCallback(res, req, result);
      // httpHelp.sendResponse(res, "404", 404)
    }
  });
};

exports.addUrlToList = function(res, req, url){
  console.log('In beginning of addUrlToList',url);
  fs.appendFile(exports.paths.list, url);
};

exports.isURLArchived = function(url, index, collection){
  // TODO: Need to just return true or false
  fs.exists(exports.paths.archivedSites+'/'+url, function(exists) {
      if (exists === false) {
        exports.downloadUrls(url);
      }
    });
};

exports.downloadUrls = function(url){
  request('http://'+url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      fs.writeFile(exports.paths.archivedSites+'/'+url, body, function(err) {
      });
    }
  })
};









