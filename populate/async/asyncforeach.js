

var express = require('express')
var app = express();
var async =require('async');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
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
  var work=new Work();
 Work.find({email:req.body.email},function(err,works){
    var result = [];
    var i=0;
    async.forEach(works, function(workId, callback) { //The second argument, `callback`, is the "task callback" for a specific `messageId`

var person=new Person();
 Person.find({_id:workId.uid},function(err,data){

workId.uid=data[0];
result.push(workId);
i++;
if(works.length == i){
res.send(result);
}
 });
 
 callback();
     
      })

  
    }, function(err) {
        if (err) return next(err);
        
    });
});


app.listen(3000);
console.log('hi');