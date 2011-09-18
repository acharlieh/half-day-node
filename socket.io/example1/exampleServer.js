var io = require('socket.io').listen(3000);

io.sockets.on('connection', function (socket) {
  setInterval(function(){
    socket.emit('news', { hello: new Date() });
  }, 1000);

  socket.on('my other event', function (data) {
    console.log(data);
  });
});
