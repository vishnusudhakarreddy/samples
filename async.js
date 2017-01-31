var express = require('express')
var app = express();
var async =require('async');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))

var mongodb=require('mongodb');
var mongoclient=mongodb.MongoClient;
var url = 'mongodb://localhost:27017/subhash';

app.get('/zozz', function(req, res, next) {
var locals = {};   
   
    async.parallel([
        //Load user
        function(callback) {
         mongoclient.connect(url,function (err,db) {
 

 var collection = db.collection('zozz');
     collection.find(req.body).toArray(function (err, data) {
    
    locals.data=data
  })

  });
   callback();
          
        },
        //Load posts
        function(callback) {
       mongoclient.connect(url,function (err,db) {

 var collection = db.collection('students');
     collection.find(req.body).toArray(function (err, data) {
     
      locals.data1=data
res.send(locals)
  })
     
  })
                callback();
        }
    ], function(err) { //This function gets called after the two tasks have called their "task callbacks"
        if (err) console.log(err); //If an error occurred, we let express handle it by calling the `next` function
        //Here `locals` will be an object with `user` and `posts` keys
        //Example: `locals = {user: ..., posts: [...]}`
        
      
    });
});

app.listen(3000);
console.log('hi subhash');

