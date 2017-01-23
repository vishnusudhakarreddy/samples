
var mongodb = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/subhash');
var express=require('express');
var app=express();
var Schema = mongoose.Schema;
var breakfastSchema=new Schema({

name:{  
         type:String,
	     required:[true,"Please enter "],
	     unique:true
	     
     },

tifins:{
        type: String,
         required:true,
        enum: ['idli','dosa','puri','vada',
        'utappam','upma','mysorebujji','sambaridli',
        'setdosa','masaladosa','ullidosa','ravvadosa',
        'chapathi','parota','karamdosa','pulihora','vegitablerice']
      },
plates: {
        type: Number,
        required:true,
        dropDups:true,
        min: 1,
        max: 3
      },
 drink: {
        type: String,
        enum: ['Coffee', 'Tea','milk','boost','lemontea',
        'greentea','horliks','bornavita']
      },
 price: {
        type    : Number,
        required:true
      }
});

var Breakfast =mongoose.model('Breakfast',breakfastSchema);

 var User = new Breakfast({
 	  name   :'lathaa',
      tifins :'dosa',
      plates :2,
      drink  :'lemontea',
      price  :20*2
    });
   var error = User.validateSync();
 
User.save(function(err){
	 if (err) throw err;
 console.log('User created!');
});
Breakfast.findOneAndUpdate({name:'subhash',tifins:'mysorebujji'},
	                      {name:'subhash',tifins: 'puri '},
 function(err, user) {
  if (err) throw err;

  console.log(user);
});
Breakfast.findOneAndRemove({ name: 'bondam' }, function(err) {
  if (err) throw err;
  console.log('User deleted!');
});

 
app.get('/hotelorder',function(req,res){

Breakfast.find({}, function(err, users) {
  if (err) throw err;
  console.log(users);
  res.send(users);
});

})
app.listen(3000);