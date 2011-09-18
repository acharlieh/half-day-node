var doWork = function() {
	console.log(new Date());
}

var handle = setInterval(doWork,1000);
var clear = setTimeout(function() { 
	console.log("die!");
	clearTimeout(handle);
},5000);


