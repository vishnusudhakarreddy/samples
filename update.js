var mongodb = require('mongodb')
var mongoclint = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/subhash';
var express = require('express')
var app = express();


app.get('/players/:name',function(req,res){

 //li = parseInt(req.query.limit) || 11;
 change = req.params.name ,
 query = req.query.update;
 mongoclint.connect(url,function(err,db) {

    var collection = db.collection('cricket');
	if(err){
		console.log(err);

	}else{

	/*collection.find({name:{ $regex: query, $options: 'i'}},{name:change}).limit(li).
  toArray(function (err, data) {
  if (err) {
   console.log(err);
  } else {
  
  console.log('find Successfully %d document(s).', data);
    res.send(data)
  }

  })
    */
 collection.update({name:change},{name:query},function (err, data) {
  if (err) {
    console.log(err);
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