var archive = require('../helpers/archive-helpers')
var fs = require('fs');
var cronJob = require('cron').CronJob;
new cronJob('* * * * * *', function(){

// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.


// Function split
  var stringData = "";
  fs.readFile(archive.paths.list, function(err, data) {
    if (err) {throw err;};
    var stringed = data + ''
    stringData += stringed;
    var urls = stringData.split('\n');
    for (var i = 0; i < urls.length; i++) {
      archive.isURLArchived(urls[i]);
    }

  });

}, null, true, "America/Los_Angeles");
