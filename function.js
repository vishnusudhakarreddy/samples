var mongodb = require('mongodb'), db=require('./globals.js');

var mongolcient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/'+DB_NAME;


exports.qfun1 = function(req,res) {
var query = req.query.name || '',
 li = parseInt(req.query.limit) || 2;
console.log(req.query.name)
	 mongolcient.connect(url,function(err,db){
     if (err) {
	console.log(err);
    }else{
	console.log('data success',url);
   
   var collection = db.collection('cricket');

   collection.find({name:{ $regex: query, $options: 'i'}}).limit(li).toArray(function(err,data){
   

    if (err) {
	console.log(err);
    }else{
	console.log('find data',data);
	res.send(data)
   }

     })
  
}


})
	
}
exports.qfun2 = function(req,res) {
	res.send(req.params.id)
}
 
