var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongodb = require('mongodb');
mongoose.connect('mongodb://localhost:27017/subhash');

var newPatientSchema = new Schema({
   phone       : { type: String, required: true, unique: true },
  /*  
    firstName   : { type: String, required: true, unique: true },
    lastName    : { type: String, required: true, unique: true },
    email       : {type:String,required: [true,"email is mandatory"], unique: true},*/
   
 //apNumber    : {type:String,unique:true},
   
   // alterPhone  : Number,
    
   /* age         : Number,
    motherName  : String,
    caste       : String,
    height      : Number,
    weight      : Number,*/
    
   
  /*  education   : String,
    ocupation   : String,
    citizenship : String,*/
 
   /* address     : String,
    pincode     : Number,
    muncipality : String,
    city        : String,
    state       : String,
    country     : String,*/
});
 
var User = mongoose.model('User', newPatientSchema);
module.exports= User;
