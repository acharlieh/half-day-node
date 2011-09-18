var mongoose = require ('mongoose');
mongoose.connect('mongodb://localhost/nodejs-bootcamp');
var Schema   = mongoose.Schema;

var CommentSchema = new Schema({
    title     : String
  , body      : String
  , date      : Date
});

mongoose.model('Comment', CommentSchema);

var Comment = mongoose.model('Comment');

var comment = new Comment({
  title: 'Nice Post'
});
comment.body = 'Pretty nice summary. I linked it on HN.'

comment.save(function(err, comment){
  console.log(comment);
  mongoose.disconnect();
});

