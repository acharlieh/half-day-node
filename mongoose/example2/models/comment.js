var mongoose = require ('mongoose'),
  Schema = mongoose.Schema;

var CommentSchema = new Schema({
    title  : String
  , body   : String
  , date   : Date
});

module.exports = mongoose.model('Comment', CommentSchema);

