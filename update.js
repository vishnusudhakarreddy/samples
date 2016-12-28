var mongodb = require('mongodb')
var mongoclint = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/subhash';
var express = require('express')
var app = express();


app.get('/employe/update',function(req,res){
console.log('hiiii')
mongoclint.connect(url,function(err,db) {

	if(err){
		console.log(err);

    
	}else{
		var updateData = db.collection('employe');
	updateData.find({name:'subhash',company:'zozz'}).toArray(function (err, data) {
  if (err) {
   res.send(err);
  } else {
    
    console.log('update Successfully %d document(s).', data);
    res.send(data)
  }

  })

  db.close();

}	

})
})
app.listen(3000);
console.log('hi subhash');