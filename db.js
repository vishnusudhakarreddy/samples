var mongodb = require('mongodb')
var mongoclint = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/subhash';
var express = require('express')
var app = express();


app.get('/players',function(req,res){

mongoclint.connect(url,function(err,db) {

	if(err){
		console.log(err);
	}else{
		var findData = db.collection('cricket');
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