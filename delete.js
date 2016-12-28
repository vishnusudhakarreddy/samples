var mongodb = require('mongodb')
var mongoclint = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/subhash';
var express = require('express')
var app = express();


app.get('/employe/delete',function(req,res){

mongoclint.connect(url,function(err,db) {

	if(err){
		console.log(err);
	}else{
		var deleteData = db.collection('employe');
	deleteData.remove({name:'subhash'},function (err, data) {
  if (err) {
   res.send(err);
  } else {
    console.log('delete Successfully %d document(s).', data);
    res.send(data)
  } 

  })

  db.close();

}	

})
})
app.listen(3000);
console.log('hi subhash');