

var mongodb = require('mongodb');
var mongoclinent = mongodb.MongoClient;
var url = "mongodb://localhost:27017/subhash";

var data = require('./exm2.json');


mongoclinent.connect(url,function (err,db) {
	if (err) {
		console.log('err');
	}else{
        
    console.log('displayed to collections',data);

 var collection = db.collection('employe');
     
     collection.insert(data,function(err, list){
      if(err){
        console.log(err);
      }else{
         console.log('inserting data');
      
      }
})

    
	}
	 db.close();

})


 