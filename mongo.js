var mongodb = require('mongodb')
var mongoclint = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/subhash';


mongoclint.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    //HURRAY!! We are connected. :)
    console.log('Connection established to',url);

    // Get the documents collection
       var collection = db.collection('cricket');



    var player1 = {name: 'sachin', age: 42, roles: ['batsman',  'player']};
    var player2 = {name: 'ganguly', age: 40, roles: ['batsman','player']};
    var player3 = {name: 'sehwag', age: 36, roles: ['batsman', 'player']};
    var player4 = {name: 'kohli', age: 28, roles: ['batsman', 'player']};
    var player5 = {name: 'rohith', age: 30, roles: ['batsman','player']};
    var player6 = {name: 'jadeja', age: 30, roles: ['batsman', 'bowler', 'player']};
    var player7 = {name: 'dhoni', age: 38, roles: ['batsman','keeper', 'player']};
    var player8 = {name: 'aswin', age: 34, roles: ['batsman', 'bowler','player']};
    var player9 = {name: 'pandya', age: 26, roles: ['batsman', 'bowler', 'player']};
    var player10 = {name: 'bhumra', age: 23, roles: ['bowler', 'player']};
    var player11 = {name: 'bhuvaneswar', age: 25, roles: ['bowler','player']};
   

  

    collection.insert([player1, player2, player3,player4,player5,
   	player6,player7,player8,player9,player10,player11],function(err, list){
    	if(err){
    		console.log(err);
    	}else{

    		db.close();
    	}
    })
  }
});


