var fn = function(){
  console.log(new Date());
};

var handle = setInterval(fn, 1000);
setTimeout(function(){
  clearInterval(handle);
}, 5000);
