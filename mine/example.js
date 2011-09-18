//console.log("Hello World");
//console.log(process);
//var greetee = process.argv[2];
//console.log("hello "+ greetee);
var args = process.argv.slice(2);
console.log("Input:" + args);
/*var sum = 0;
args.map(function(x){ sum += parseFloat(x) });
console.log(sum);*/

var sum = args.reduce(function(a,b) { return parseInt(a) + parseInt(b); },0);
console.log(sum);


console.log(__filename);
console.log(__dirname);
console.log(process.cwd());
