var express = require('express')
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))

var mongodb=require('mongodb');
var mongoclient=mongodb.MongoClient;
var url = 'mongodb://localhost:27017/subhash';




app.delete('/zozz',function(req,res){
mongoclient.connect(url,function(err,db){
if(err){
console.log('err');
}else{
     var collection=db.collection('zozz')
collection.remove({id:req.body.id},function(err,data){
if(err){
res.send(err)
}else {
	console.log('deleted')
	res.send(data)
}
})
}
})
})

app.post('/zozz',function(req,res){

var id=parseInt(req.body.id);
   var name =req.body.name;
   var role =req.body.role;
   var company =req.body.company;
    var data = req.body

if(req.body.company!='zozz'){
	res.send('invalid company name')
}else{
mongoclient.connect(url,function(err,db){
if(err){
console.log('err');
}else{
     var collection=db.collection('zozz')
collection.find({$or:[{id:req.body.id},{name:req.body.name}]}).toArray(function(err,list){
if(err){
res.send(err)
}else if(list.length>0){
res.send("already exists")
		
}
else{

			mongoclient.connect(url,function(err,db){
		if(err){
		console.log('err');
		}else{
		     var collection=db.collection('zozz')
		collection.insert(req.body,function(err,data){
		 
		   res.send(data);
		})

		}
		
		})
}
})
}
})

} 

})
app.put('/zozz',function(req,res){
	mongoclient.connect(url,function(err,db){
		if(err){
		console.log('err');
		}else{
		     var collection=db.collection('zozz')
		collection.update({id:req.body.id},
			{$set:{name:req.body.name,role:req.body.role}},
			{multi:true,new:true},function(err,data){
		 
		   res.send(data);
		})

		}

		})
})

app.get('/zozz',function(req,res){
   var query=req.query.name|| '';

mongoclient.connect(url,function (err,db) {
  if (err) {
    console.log('err');
  }else{
        
    console.log('displayed to collections');

 var collection = db.collection('zozz');
     collection.find({name:{$regex:query,$options:'i'}}).toArray(function (err, data) {
  if (err) {
   res.send(err);
  } else {
    console.log('find Successfully %d document(s).', data);
    res.send(data)
  } 

  })

  }
  db.close();
})
})

app.listen(3000);
console.log('hi subhash');

