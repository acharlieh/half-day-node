var events = require('events');

var emitter = new events.EventEmitter();

emitter.on('greet', function(name) {
  console.log("hello " + name);
});

emitter.on('greet', function(name) {
  console.log(name + " was greeted");
});

emitter.once('greet', function(name) {
  process.nextTick(function() {
    console.log(name + " was greeted first!");
  });
});

emitter.emit('greet', 'folks');
emitter.emit('greet', 'world');
