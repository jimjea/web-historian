var archive = require('../helpers/archive-helpers')
var fs = require('fs');

// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.


// Function split
var stringData = "";
fs.readFile(archive.paths.list, function(err, data) {
  if (err) {console.log( err);};
  var stringed = data + ''
  stringData += stringed;
  var urls = stringData.split('\n');
  console.log(urls);
  for (var i = 0; i < urls.length-1; i++) {
    console.log('in the for loop',urls[i]);
    archive.isURLArchived(urls[i]);
  }

});
  // foreach(website)
    // downloadUrl


// )
