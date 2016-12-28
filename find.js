var express = require('express');
var app = express();

var mongodb = require('mongodb');
var mongoclinent = mongodb.MongoClient;
var url = "mongodb://localhost:27017/subhash";


app.get('/employe/find',function(req,res){

mongoclinent.connect(url,function(err,db) {

	if(err){
		console.log(err);
	}else{
		var findData = db.collection('employe');
	findData.find().toArray(function (err, data) {
  if (err) {
   res.send(err);
  } else {
    console.log('find Successfully %d document(s).', data);
    res.send(data)
  } 

  })

  db.close();

}	

})
})
app.listen(3000);
console.log('hi subhash');