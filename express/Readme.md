# Express
Web frameworks in node.js are a dime a dozen, but express is interesting because it's simple but has a lot of building blocks that can be used to build complex parts. 

## Getting Started
The easiest way to use express is to install it via `npm install -g express` and use the command line utility that it ships with to create a skeleton project. Go ahead and give it a try.
  
  express

This creates a default project structure with some example views as well as an app.js file that has a single route defined. You can also use some customizations with this. For example, the default template is jade, but if you prefer ejs you can do
  
  express -t ejs

Or what about ejs templates with sass stylesheets plus session support?
  
  express -t ejs -c sass -s

Go ahead and look through the generated project. Tinker around with it. 

## Routes
Thre crux of express are routes. These simply represent HTTP verbs and looks imilar to the following:

  app.get('/foo/bar', function(req, res){
    res.render('index', {name: req.param('name')});
  });


  app.post('/foo/bar', function(req, res){
    res.render('index', {name: req.param('name')});
  });

You can also use a shortcut route that represents any get, post, put or delete to a url.
  
  app.all('/foo/bar', function(req, res){
    res.render('index', {name: req.param('name')});
  });

Finally, as a handy shortcut, you can post objects from a form as well. For example, if you have a form like this
  
  form(method="post", action="/foo")
    input(name="user[name]", type="text")
    input(name="user[password]", type="password")

You can access it on the server side as 

  app.post('/foo'. function(req, res){
    var user = req.param('user');
    
    res.send({user:user});
  });

Go ahead and run the app.js under example1 and see what happens when you submit the form. ;)


## Exercise 1
So we've been using wordpress for awhile and decided it just isn't for us... we would prefer to roll our own thank you very much!

  * Write a Post
    - Allow the user to post a simple blog post with a title and a body
  * View posts
    - display all the blog posts
  * Add Comment
    - Add comments to an existing post

For now, just implement the data store in memory.


