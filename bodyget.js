var express = require('express');
var app= express();

var mongodb = require('mongodb');
var mongoclinent = mongodb.MongoClient;
var url = "mongodb://localhost:27017/subhash";

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
   db.close();

})




})
app.listen(3000);
console.log('success subhash reddy')