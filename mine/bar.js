var foo = require('./foo.js');
var bar = require('./foo.js');

bar.value = 10;

console.log(foo.value);
console.log(bar.value);
