var express = require('express');
var app= express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))


var mongodb = require('mongodb');
var mongoclinent = mongodb.MongoClient;
var url = "mongodb://localhost:27017/subhash";
   
app.delete('/zozz',function(req,res){

mongoclinent.connect(url,function (err,db) {
  if (err) {
    console.log('err');
  }else{
        
    console.log('displayed to collections');

 var collection = db.collection('zozz');
     
     collection.remove({name:req.body.name},function(err, list){
      if(err){
        console.log(err);
      }else{
         console.log('deleting data');
      res.send(list)
      }
})
   
  }

})

})
 app.put('/zozz',function(req,res){
 
mongoclinent.connect(url,function (err,db) {
  if (err) {
    console.log('err');
  }else{
        
    console.log('displayed to collections');

 var collection = db.collection('zozz');
    
 collection.update({id: req.body.id},{$set:{name: req.body.name}},
  {multi: true, new: true} ,
  function (err, data) {

  res.send(data);
}); 
  }

})


}) 

app.get('/zozz',function(req,res){
   

mongoclinent.connect(url,function (err,db) {
  if (err) {
    console.log('err');
  }else{
        
    console.log('displayed to collections');

 var collection = db.collection('zozz');
     
    
     collection.find().toArray(function(err, data){
      if(err){
        console.log(err);
      }else{
         console.log('finding data');
      res.send(data);
      }
}) 
  }

})
})
app.post('/zozz',function(req,res){

var id = req.body.id;
var name = req.body.name;
var role = req.body.role;
var company = req.body.company;
var address = req.body.address;
var data =req.body;
mongoclinent.connect(url,function (err,db) {
  if (err) {
    console.log('err');
  }else{
        
    console.log('displayed to collections',data);

 var collection = db.collection('zozz');
     
     collection.insert(data,function(err, list){
      if(err){
        console.log(err);
      }else{
         console.log('inserting data');

     app.get('/zozz/find',function(req,res){

     	 res.send(req.body);
     })
     
      }
})
    
  }
   db.close();

})




})
app.listen(3000);
console.log('success subhash reddy')