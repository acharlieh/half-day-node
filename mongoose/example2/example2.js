var mongoose = require ('mongoose')
  , Comment  = require ('./models/comment')
  , emitter  = new(require('events').EventEmitter);

mongoose.connect('mongodb://localhost/nodejs-bootcamp');

Comment.find({}, function(err, comments){
  comments.forEach ( function(comment){
    comment.remove();
  });
 
  emitter.emit('/comments/removed');
});


var createPost = function(t,b) {
  var comment = new Comment({
      title  : t
    , body   : b
  });

  comment.save(function(err, comment){
    console.log(comment);
  });

}

emitter.on('/comments/removed', function(){
  var comment = new Comment({
      title  : 'Nice Post'
    , body   : 'Good stuff. I posted a link on HN.'
  });

  comment.save(function(err, comment){
    console.log(comment);
  });

});



