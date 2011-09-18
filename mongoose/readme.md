# Persistence with Mongoose
Node.js has a lot of persitance options available for your applications whether you use MySQL, CouchDB, Redis, Riak, or Mongodb. There really isn't one clear reason to use one or the other except for what you're most comfortable with, I'd even suggest checking out some frameworks such as Sequelize for MySQL or cradle for CouchDB.

However, I've been a big fan of Mongoose (http://mongoosejs.com/) for MongoDB lately due to its ease of use and good design. In this session we'll give an overview of Mongoose and use it a persistant data store for our application.

## Getting It
Getting it is just a matter of adding mongoose to your dependencies hash in the package.json of your project and running npm install.

## Getting Started
First start up mongodb from the commandline. In another terminal, let's type mongo to view the contents of the database. We'll come back to this later as we work through the examples/.

Let's get started by creating a simple model and persisting it. See the example in the example1 directory of this folder. 

This is a pretty straightforward example... it defines a schema, registers it with mongoose, creates and saves a new instance, and prints out the saved instance before disconnecting. 
  
Run the example. Now switch to the database and type 

  use nodejs-bootcamp
  db.comments.find()

You should see the new comment that we just added. 

In example2, we go a step further by isolating the model definition to an external file that we can simple require when we want to import a model definition into our script. Remember that modules are cached so we can include this as many times as we want in multiple places. 

In this example, we find all comments and remove each one (so we don't keep populating the database with multiple copies) and emit an event one completion of removing all of them. The example then listens for this event and uses it to save a new document instance. The reason here is because we have no guarantee that the removals will happen before we save a new document. :)

### Validation

Validation is pretty flexible... there are many built in validators (and even plugins that add new validators) and you can easily define your own custom validators as well.

For an example of a built in validator lets constraing a numerical property to a specific range.

  var schema = new Schema({
    age : {type: Number, min: 21, max:55}
  });

The built-in validators are pretty basic.. they just cover min, max, and enum (which constrains a string property to an enumeration of values).

Going further, let's define a regex to specify a name can only consist of letters

  var schema = new Schema({
    name: { type: String, validate: /^\w+$/ }
  });

Although it looks like this it's a built in regex validator, a regex is already a function that simply gets called. We could do something similar by using a function instead:

  var schema = new Schema({
    name: { type: String, validate: [function(v){
      return v.length > 0;
    }, 'Name cannot be empty']}
  });

You can see this begins to get a bit verbose. Let's take a look at the validation example validation2.js for an example of using the validate method rather than putting the validation logic in the schema json. Basically, it looks like this:


  var schema = new Schema({
    name: String
  });
  
  schema.path('name').validate(function(v){
    return v.length > 0;
  });

### Defaults
You can define default values as well using the default property.

  var schema = new Schema({
    name: { type: String, default: 'The Dude'}
  });

### Setters/Getters
Need custom setters? No problem!

  function toLower (v) {
    return v.toLowerCase();
  }

  var UserSchema = new Schema({
    email: { type: String, set: toLower } 
  });

Ditto for custom getters.
  function obfuscate (cc) {
    return '****-****-****-' + cc.slice(cc.length-4, cc.length);
  }

  var AccountSchema = new Schema({
    creditCardNumber: { type: String, get: obfuscate }
  });
### Custom Methods
Sometimes you wind up with a pretty verbose query to find specific documents in mongoDB. Rather than copy and past this complex query all over your system, why not create a custom method to encapsulate it? Makes sense, right?

Here's an example of a static method that returns all the active users

  var schema = new Schema({
      name: String
    , status: String
  });

  schema.statics.findActiveUsers = function(cb){
    return this.find({status:'active'}, cb);
  });

Or what about a method on an actual model instance?

  schema.methods.isActive = function(){
    return this.status == 'active';
  };  
  
  // -- elsewhere in our codebase
  if(lead.isActive()){
    // contact lead
  }
  
## Exercise: Lead Management System
In this exercise, the task is to create a simple interface to perform CRUD uoperations for a Lead Management System. This will be an express based application that allows the user to create new leads, edit existing leads, or remove leads from the system. 

A lead consists of the following information:

    * Name
    * Phone Number
    * Email Address
    * Company Name

Once you get the basic CRUD operations working, try adding some validation. Fields Name, Phone Number, and Email Address are required and cannot be empty. Email should at least have a @ and a single period somewhere in the domain name. As for phone numbers...

It drives me nuts when a site doesn't let me enter (555)555-5555 as my phone number. Who gave them the right to dicate what is and isn't a valid phone number? Ideally, we should let the user enter whatever they please and just make sure the number of digits are sufficient for us to call them.

