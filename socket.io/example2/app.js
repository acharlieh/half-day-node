var express = require('express');

var app = module.exports = express.createServer();
var io = require ('socket.io').listen(app);

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

// Configuration
app.get('/', function(req, res){
  res.render('index', {
    title: 'Socket.IO Example 2'
  });
});

setInterval(function(){ 
  io.sockets.emit('memory-usage', process.memoryUsage());
}, 1000);

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
