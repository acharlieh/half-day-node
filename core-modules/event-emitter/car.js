var events = require ('events')
  , util   = require ('util');

function Car () {
  events.EventEmitter.call(this);
}

util.inherits(Car, events.EventEmitter);

Car.prototype.accelerate = function(){
  this.emit('accelerate');
}
Car.prototype.brake = function(){
  this.emit('brake');
}

module.exports = Car
