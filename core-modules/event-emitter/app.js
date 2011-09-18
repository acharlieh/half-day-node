var Car = require ('./car')

var nissan = new Car();

nissan.on('accelerate', function(){
  console.log('the car has accelerated');
});

nissan.once('accelerate', function(){
  console.log('car accelerated for first time');
});

nissan.on('brake', function(){
  console.log('brakes were hit');
});
nissan.on('brake', function(){
  console.log('QUIT SLAMMING THE BRAKES!');
});

nissan.accelerate();
nissan.accelerate();
nissan.accelerate();
nissan.brake();
