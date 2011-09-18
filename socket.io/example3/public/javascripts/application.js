
$(function(){
  var socket = io.connect('http://localhost');

  $('input#set').click(function(){
    socket.emit('/register/name', $('#name').val(), function(result){
      $('#results').text(JSON.stringify(result));
    });  
  });
});
