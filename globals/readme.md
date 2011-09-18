# Globals
Now that we've covered some of the ES5 features available in node.js it is time to actually move on to some of the node specific stuff. You might have noticed the previous examples that used console.log to display text to the console. This is just one of the several global objects available within node.js

Just about every javascript interpreter has some form of global objects (in the browser global is usually window and global variables are attached to window) and node.js is no different. Here we'll cover the core global variables:

 * console
 * process
 * require
 * __filename
 * __dirname
 * module

## console
The console object is similar in functionality to the console object in google chrome or firefox's firebug. It allows logging to the console (with different log levels) as well as other handy features like timers.

To log a message to the console, try one of the following:
	console.log('hello world');
	console.info('hello world');
	console.warn('hello world');
	console.error('hello world');

console.dir is interesting as it prints the structure of the object passed to it out to the console. Try a few of these:
	console.dir({a:'some string' b:function(){}});
	console.dir(module);
	console.dir(console);

An important caveat to pay heed to is that (at least at the time of this writing) console.dir prints [Circular] for instances it has already seen.
	
	console.dir([ ['a', 'b'], ['a', 'b']]);
	
	var x = ['a', 'b'];
	console.dir([x,x,x]);

Finally, the last feature of console that might be of interesst to us is time and timeEnd, which starts a timer with a specified name that ends and prints the time elapsed in miliseconds to the console when timeEnd is called.

	console.time('a');
	console.time('b');

	console.timeEnd('b');
	console.timeEnd('a');
	
	console.timeEnd();

	console.time();
	console.timeEnd();


## require
Require is what you use to import other modules into your program for use. Think of this as require in other languages like ruby, python, and php. require is function that accepts a module identifier and returns the exported API of a foreign module. We'll cover this in detail but for now it's just important to understand how to use require to import other modules into your application.

To include a module, we can do the following:
	
	var http = require('http');
	
	console.dir(http);

This will include the module and namespace it under the variable http. The variable that holds it doesn't have to be the same as the module name, but it is a common (and useful) convention. 

When a module name is passed to require, it searches the module.paths from the top down until it finds the module it is looking for. Go ahead and take a look at it:
	
	console.log(module.paths);

You can also modify the NODE_PATH env variable if there are additional paths you want to add for node to search for modules in. As of this writing you can actually modify module.paths but modifying it at runtime is considered a design flaw that will be patched in later version. 

Typically modules will consist of a public API that you can access to either call variables/methods like normal and even instantiate objects that are part of that API. Take EventEmitter for example:
  
  var events = require('events');
  
  var emitter = new events.EventEmitter();

You can also instantiaite a module that is required by passing it to new(). Here's a common example of requiring EventEmitter and intantiating it right away.

	var emitter = new(require('events').EventEmitter);

This is handy for instances where you want to only create one instance of something.

## __filename and __dirname
__filename and __dirname represent the filename of the executing script and the directory in which it resides, respectively. A very common use of __dirname is to include user scripts onto the require path relative from the current script directory. 

	var foo = require(__dirname+'/foo');


## process
The global vaariable process is an object that is a reprsentation of the process the current script is running in. This has many useful methods and read only attributes regarding the process and the system it is executing in. From the REPL, type in process. and hit space to see a listing of its properties. Go ahead and try a few of them out and see what they are.

  process.env            // array of environment variables
  process.version        // displays the node.js version of the current running process
  process.cwd();         // current working directory
  process.memoryUsage(); // displays memory usage

### process.nextTick
process.nextTick schedules the supplied function to be ran at the beginning of the next event loop. What this means is you are effectively saying "don't run this right away, but run it as soon as you're bored and don't have anything else to do". Give it a try

  process.nextTick(function(){ console.log('Hello World'); });

Or try it in a file. Edit a file named nextTick.js and include the following:
  
  var i = 0, 
    fn = function(a){
      if(a) { 
        console.log('called directly');
        console.log(i+=a);
      }else{
        console.log(++i);
      }
    };

  process.nextTick(fn);
  process.nextTick(fn);
  fn(5);
  process.nextTick(fn);
  process.nextTick(fn);
  fn(5);
  process.nextTick(fn);

Now run 
  node nextTick.js

Take special note of the ordering of calls. 

### process.argv
This is an array of the arguments passed to the commandline when the script executed. Create a file with the following:
	
	console.log("Hello " + process.argv[2]);
	
	console.log("Command ran: " + process.argv[0]);
	console.log("script name: " + process.argv[1]);

Save the file (something like demo.js or whatever) and execute the following from the commandline:
	node demo.js YourName

#### Exercise
Write a script that takes a variable number of arguments of numbers, tally them up and print them to the console. For example:
	
	node sum.js 5 4 4 10
	
Outputs
	The sum of these numbers is 23

### process.openStdin
openStdin will open a readable stream to capture user input from the command line. You can then listen for the data event, which will fire on each line feed

	var stdin = process.openStdin();
	
	stdin.on('data', function(input){
		console.log(input.toUpperCase());
	});
  
The converse of this is process.stdout, which is a writable stream that you can write to.

	process.stdout.write('Hello\n');
	
### process.env
This points to the same thing as running env on the command line... it contains a map of all the environment variables.

	console.dir(process.env);
	console.log(process.env.PATH);
	console.log(process.env.USERNAME);
	
A useful convention is to create an environment variable named NODE_ENV to specify if the environment is 'development' or 'production'. It isn't a standard yet but most node apps inspect that variable to determine if they are in develop or production, defaulting to development if it is not defined.

### Events
There are several events that one can listen to on process (more on events later) which provide a useful way to "plug in" to different events the process can emit. Here are a few of them.

#### exit
Fired when the process is about to exit. The callback will execute right before exit so this eans that the event loop terminates after it finishes.

	process.on('exit', function(){
		setTimeout(function(){
			console.log('this will never execute');
		}, 1);
		console.log("exitting...");
	});

#### uncaughtException
This will get fired when an exception is thrown and finds its way to the event loop (which typically will crash the process and spit the exception out the console). If a listener is added for this event then the default behavior will not occur.

	process.on('uncaughtException', function (err) {
  		console.error('Caught exception: ' + err);
	});
	
	var range = [1..10]; // this doesn't exist and causes an error
	console.log('never executes');

#### Signal Events
You can also attach listeners onto the process for POSIX signal events as well.

	process.on("SIGSEV", function(){
		console.log("Process received a SIGSEV signal");
	});

### Further Exploration
There are a lot of other operations, go to the REPL and type process.[TAB] to see a list of other methods available, such as cwd(), kill, pid, and exit

## Interval and Timers
Just the same as client side javascript node.js implements setInterval and setTimeout to specify operations to happen at specific intervals or after a specific time has passed. These work exactly the same as they do on the client side, but it doesn't hurt to quickly recap.

  setTimeout(fn, 2000);
  setInterval(fn, 1000);

Both methods also return a handler that can be passed to clearTimeout or clearInterval to prevent the next operation from happening.

### Exercise: 
  Have a function execute every second and stopping after 5 seconds have elapsed.

