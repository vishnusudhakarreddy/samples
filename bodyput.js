var express = require('express');
var app= express();

var mongodb = require('mongodb');
var mongoclinent = mongodb.MongoClient;
var url = "mongodb://localhost:27017/subhash";
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))

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
   db.close();

})

})
app.listen(3000);
console.log('success subhash reddy')