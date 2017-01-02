var express = require('express');
var app= express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))

var mongodb = require('mongodb');
var mongoclinent = mongodb.MongoClient;
var url = "mongodb://localhost:27017/subhash";

app.post('/zozz',function(req,res){

var id = req.body.id;
var name = req.body.name;
var role = req.body.role;
var company = req.body.company;
var address = req.body.address;
var data =req.body;
mongoclinent.connect(url,function (err,db) {
  if (err) {
    console.log('err', err);
  }else{
        
    console.log('displayed to collections',data);

 var collection = db.collection('zozz');
     
     collection.insert(data,function(err, list){
      if(err){
        console.log(err);
      }else{
         console.log('inserting data');
      res.send(list)
      }
})

    
  }
   
db.close();
})

})
app.listen(3000);
console.log('success subhash reddy')