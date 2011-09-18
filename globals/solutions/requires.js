var foo = require('foo'),
  otherFoo = require(process.cwd()+'/lib/foo');

console.log(foo.a);
console.log(otherFoo.a);
console.log(module.paths);
