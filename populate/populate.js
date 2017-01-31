

var express = require('express')
var app = express();

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


app.post('/emp',function(req,res){

var emp = new Person()
    var ObjectId = require('mongoose').Types.ObjectId;
    emp._id = new ObjectId();
var name=req.body.name;
var age =req.body.age;
var email=req.body.email;
emp.name=name;
emp.age=age;
emp.email=email;

   emp.save(req.body,function(err,data){

   	res.send(data);
   })

   });

app.post('/work',function(req,res){
   

    var emp = new Person();
    var work = new Work();

    	
 Person.find({email:req.body.email}, function(err, doc) {

 	  var ObjectId = require('mongoose').Types.ObjectId;
   work._id = new ObjectId();
   console.log(doc);
  work.uid =doc[0]._id;
  work.company = req.body.company;
      work.save(function(err,data){
        res.send(data);
       })
           
    });
});

app.get('/work',function(req,res){
  var work = new Work();
 
   Work.find({
       email:req.body.email
    }).populate('uid').exec(
        function(err, list) {
            if (err) {
              console.log(err)
               
            } else {
               
              res.send(list);

            }
        })
	  
});


app.listen(3000);