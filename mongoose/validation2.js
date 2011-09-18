var mongoose = require ('mongoose')
  , Schema   = mongoose.Schema;

mongoose.connect('mongodb://localhost/nodejs-bootcamp');
function printError(err){
  console.log(err);
}

var schema = new Schema({
    name: String
});
var notEmpty = function(v) { return v.length > 0};

schema.path('name').validate(notEmpty, 'Name cannot be empty');

var Employee = mongoose.model('Employee', schema);

new Employee({name:''}).save(printError);
new Employee({name:'James'}).save(printError);


