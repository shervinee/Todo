// setting up the whole thing 
var express = require('express'); //including node-module express to our app, so similar to the require we had in react native 
var app = express(); //what is our app ? nothing but the express version of node.js 
var mongoose = require('mongoose'); //as said we need mongoDB for database 
var morgan = require('morgan'); //eases the log requests to the console (we use it in front-end)
var bodyParser = require('body-parser'); //easily pulls information from HTML POST (from angular to API ?)
var methodOverride = require('method-override') //simulate DELETE and PUT for us 

//configuration of our things above 
mongoose.connect('mongodb://shervinee:doberman18@ds139124.mlab.com:39124/todo_sherv'); //using our local host for now 
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we\'re connected!');
});


// now that database is set up let's get to use the express
app.use(express.static(__dirname + '/public'));  //with this we are setting the static files (flies shared with everyone) on location public/img for users 
app.use(morgan('dev')); //log all the requests to the console so we can keep track of things 
app.use(bodyParser.json());                 // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

app.listen(8080); //this would start our app 
console.log("App listening on port 8080");


var todo = mongoose.model('Todo', {
  text: String
});
//let's have our express routes here for now (get.post,delete)

//api
//get all todos
app.get('/api/todos', function (req, res){
  //we wanna get todos --> we use monogoose
  Todo.find(function(err,todos){
    if (err) 
      res.send(err);

    res.json(todos);
  }); 
});

//post all the todos to back-end and then respond by whatever we have in our database now 
app.post('/api/todos', function(req,res){

  //we create a todo and fetch the info from whatever ajax is giving us 
  Todo.create({
    text : req.body.text,
    done : false
  }, function(err, todo) {
    if(err)
      res.send(err);
    
    Todo.find(function (err, todos) {
      if (err)
        res.send(err);

      res.json(todos);
    });
  });
});

//delete a todo
app.delete('/api/todos/:todo_id',function(req,res){
  Todo.remove({
    _id : req.params.todo_id
  }, function(err,todo) {
      if(err)
        res.send(err);
      Todo.find(function (err, todos) {
        if (err)
          res.send(err);

        res.json(todos);
    });
  });
});


/* now that we have all the route for our action, we just need to have a route for angular 
so it can easily get connected to other routes we just made using express and mongoose 
we should remember that angular can automatically handle routing for us with the $http on our single page app index.html
*/

app.get('*', function(req,res){
  res.sendfile('./index.html'); //loading our single page 
});