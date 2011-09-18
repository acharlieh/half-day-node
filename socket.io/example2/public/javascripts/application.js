var socket = io.connect()

  socket.on('memory-usage', function(memory){
    console.log(memory);
    $('#content').append('<div>'+memory.heapUsed+' used</div>');
  });
