var mongoose = require ('mongoose')
  , Schema   = mongoose.Schema;

mongoose.connect('mongodb://localhost/nodejs-bootcamp');
var schema = new Schema({
    name: {type: String, validate: [/^[A-Za-z]+$/, 'Name should be letters only']}
});

var Employee = mongoose.model('Employee', schema);

var employee1 = new Employee({name:'james'});
var employee2 = new Employee({name:'23ames'});

employee1.save(function(err, result){
  console.log(employee1.name);
  console.log(err);
});

employee2.save(function(err, result){
  console.log(employee2.name);
  console.log(err);
});
