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
   db.close();

})




})
app.listen(3000);
console.log('success subhash reddy')