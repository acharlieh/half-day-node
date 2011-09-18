var counter = 0;
var printTime = function() {
	console.log(new Date());
	if(counter++ >=3) {
		console.log('DONE');
		clearInterval(handle);
	}
}

var handle = setInterval(printTime,1000);

setTimeout(printTime, 6000);
