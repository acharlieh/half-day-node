# Core Modules
Node.js comes bundled with several core modules. This section will cover what modules are, how to write your own, and give a brief overview of the core modules that come with node.js.

## What is a Module?
A module, simply put, is a bunch of functionality bundled up with an exported api available for reuse. Let's look at this a bit closer. 

From the repl, type module and hit enter. You'll see a lot of interesting details about the module of the currently running module (in this case, the repl). I won't delve to deeply into these for this workshop, but exports it he most important attribute to pay attention to here. Let's first experiment with requiring modules and explore exports with it.

If you create a file named a.js with the following:

  var x = 10;

and you create a file named main.js that requires that file and run it:

  var a = require('./a');
  console.log(x);

You'll notice you get an error because x is undefined. Modules isolate their variables and code and and exports an API that can be called through it. Let's modify a.js to have the following:

  var x = 10;

  console.log("Help, I'm being required!");

  module.exports = {
      value: x
  };
And back in main.js:
  
  var a = require('./a');
  
  console.log(a.value);

Essentially, all propeties bound to module.exports in a module will be exported for use where the module is included from. You'll also notice that the log message gets executed as we load the module because the script is evaluated when it is required the first time.

Try adding multiple requires of the module, but as different names. Now run main.js. Notice anything of interest?  

## Exercise
Create a commonjs module called car that implements methods like accelerate, brake, reverse that simply prints to the console what is happening when they get called. 

Import the module into another file and use it. 


## EventEmitter
The first module we'll cover is EventEmitter. EventEmitter is useful for firing and listening for events. Additionally, it can be "mixed in" with your own objects to provide publish/subscribe capabilities.

Example: 

  var events = require('events');
  var emitter = new events.EventEmitter();
  
  emitter.on('test', function(a, b){ console.log(a+b); });
  
  emitter.emit('test', 4,3);

Emitter will only handle events per EventEmitter. This is important to understand because it means that events aren't global but instead are scoped to the event emitter they belong to. 

### Mixing In
As mentioned previously, event emitters can be mixed in to your objects to provide subscribable capabilities. Let's use another module, util, to demonstrate doing this.

Back to our Car example, let's say we have a Car object with methods like brake and accelerate. Now let's say we want to be able to subscribe to these events as well.

  var events = require('events')
    , util   = require('util');
 
  function Car(){
    events.EventEmitter.call(this);    
  }
  
  util.inherits(Car, events.EventEmitter);
  
  Car.prototype.accelerate = function(){
    this.emit('accellerate');
  }

Take a look at the event emitter example.

## util
util is kind of an orphan module... it's a dumping ground for a bunch of random utilities that some use to live in the now deprecated sys module. In the end, methods here will possibly wind up elsewhere, but let's take a quick look at a couple useful methods.

### inherits
We saw this earlier in our Car example... this method is a nice helper that allows an object to extend from another's prototype. 

### pump
util.pump takes a readable stream and writable stream as its arguments and essentially pumps data from a readable stream to a writable stream as the readable stream is being read.




## FS
The filesystem module contains a rich API for manipulating and working with the filesystem. I recommend a look at http://nodejs.org/docs/v0.4.12/api/fs.html but I'll cover two important methods here, reading and writing a file.

To read a file in its entirety:

  fs.readFile(__filename, function(err, data){
    console.log(data);
  });

  
And to write to a File

  fs.writeFile('message.txt', 'Hello World', function (err) {
    if (err) throw err;
  });  

Additionally, there is also fs.createWriteStream and fs.createReadStream for creating readable and writible streams. 

## HTTP
The http module includes methods/objects for both http clients AND http servers. In fact, this is the example you see on the front page for node.js.

  var http = require('http');
  http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
  }).listen(1337, "127.0.0.1");
  console.log('Server running at http://127.0.0.1:1337/');

Using the client is pretty straightforward as well. Again, from the docs.
  
  var options = {
    host: 'www.google.com',
    port: 80,
    path: '/upload',
    method: 'POST'
  };

  var req = http.request(options, function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      console.log('BODY: ' + chunk);
    });
  });

## Exercise
It's time to glue these modules together as well as what you have learned so far. Write a program that fetches the contents of the new york times home page and writes it to a file in the current directory.

