var http = require ('http')
  , fs   = require ('fs')
  , util = require ('util')
  , options = {
      host: 'www.nytimes.com'
    , port: 80
    , path: '/'
  };

http.get(options, function(res){
  util.pump(res, fs.createWriteStream('index.html'));
});

