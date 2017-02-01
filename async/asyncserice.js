var express = require('express')
var app = express();
var async =require('async');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 mongoose.connect('mongodb://localhost:27017/subhash');

var personSchema = new Schema({
  _id     : String,
  name    : String,
  age     : Number,
  email    :String

});
var workSchema = new Schema({
  _id: String,
  uid : {type:String, ref:'emps'},
  company  : String
 
});


var Work  = mongoose.model('works', workSchema);
var Person = mongoose.model('emps', personSchema);

app.get('/work', function(req, res, next) {
    var locals = {};
   //Define `userId` out here, so both tasks can access the variable
    async.series([
        //Load user to get `userId` first
        function(callback) {
             var emp = new Person();
    
           Person.find({name:req.body.name}, function(err, users) {
                if (err) return callback(err);
                locals.users=users;
               
                callback();
            });
        },
        //Load posts (won't be called before task 1's "task callback" has been called)
        function(callback) {
             var work = new Work();
            Work.find({email:req.body.email}, function(err, posts) {
           
                if (err) return callback(err);
                
                locals.posts = posts;

                res.send(posts);
                callback();
            });
        }
    ], function(err) { //This function gets called after the two tasks have called their "task callbacks"
        if (err) return next(err);
        //Here locals will be populated with `user` and `posts`
        //Just like in the previous example
      
    });
});
app.listen(3000);
console.log('hi')