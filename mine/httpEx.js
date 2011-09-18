var http = require('http')
   ,util = require('util')
   ,fs = require('fs')
   ,readline = require('readline');

var write = fs.createWriteStream('google');

http.get({
  host: 'www.google.com'
 ,path: '/'
}, function(res){
//  res.on('data', function(data) { console.log(data.toString()); });
   util.pump(res,write);
});


