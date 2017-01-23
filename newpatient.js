var User      = require('./mongoose');
var express   = require('express');
var app       = express();
var Validator = require('express-validator');
var bodyParser= require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(Validator());

var monthAgo= new Date();
monthAgo.setMonth(monthAgo.getMonth() - 1);


app.post('/newpatient',function(req,res){
/*
  var firstName  = req.body.firstName;
  var lastName   = req.body.lastName;
  var email      = req.body.email;*/
  var phone      = req.body.phone;
 // var alterPhone = req.body.alterPhone;
 
 /* var age        = req.body.age;
  var motherName = req.body.motherName;
  var caste      = req.body.caste;
  var height     = req.body.height;
  var weight     = req.body.weight;
 */
  var apNumber   = req.body.apNumber;
 /* var education  = req.body.education;
  var ocupation  = req.body.ocupation;
  var citizenship= req.body.citizenship;*/
 
 /* var address    = req.body.address;
  var pincode    = req.body.pincode;
  var muncipality= req.body.muncipality;
  var city       = req.body.city;
  var state      = req.body.state;
  var country    = req.body.country;*/



/*
req.assert('firstName', 'firstName required', firstName).notEmpty();
req.assert('lastName', 'lastName required', lastName).notEmpty();
req.assert('email', 'Email required', email).matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
req.assert('email', 'Email required',  email).isEmail();*/
//req.assert('phone', 'Invalid Phone number', phone).matches(/^(6|7|8|9){1}\d{9}$/);
//req.assert('alterPhone', 'Invalid Phone number', alterPhone).matches(/^(6|7|8|9){1}\d{9}$/);

/*req.assert('age', 'invalid age', age).isInt().len(0,2);
req.assert('motherName', 'Invalid motherName', motherName).isEmpty();
req.assert('caste', 'Invalid caste', caste).matches(/^[A-Za-z]+$/);
req.assert('height', 'Invalid height', height).isFloat();
req.assert('weight', 'Invalid weight', weight).isFloat();*/

//req.assert('apNumber', 'Invalid apNumber', apNumber).isInt().matches(/^[0-9]/);
/*req.assert('education', 'Invalid education', education).matches(/^[A-Za-z]+$/);
req.assert('ocupation', 'Invalid ocupation', ocupation).matches(/^[A-Za-z]+$/);
req.assert('citizenship', 'Invalid citizenship', citizenship).matches(/^[A-Za-z]+$/);
req.assert('address','Invalid address',address).notEmpty();*/
/*
req.assert('pincode', 'Invalid pincode', pincode).isInt();
req.assert('muncipality', 'Invalid muncipality', muncipality);
req.assert('city', 'Invalid city', city);
req.assert('state', 'Invalid state', state);
req.assert('country', 'Invalid country', country);
*/
req.getValidationResult().then(function(result) {

    var errors = req.validationErrors();
    console.log("result ", errors);

  if(errors){
          res.send(result.mapped())  
  }else{
          var newPatient  = new User();
 
   /*newPatient.firstName   = firstName;
   newPatient.lastName    = lastName;
   newPatient.email       = email;*/
   newPatient.phone       = phone;
  // newPatient.alterPhone  = alterPhone;
/*   newPatient.age         = age;
   newPatient.motherName  = motherName;
   newPatient.caste       = caste;
   newPatient.height      = height;
   newPatient.weight      = weight;*/
   newPatient.apNumber    = apNumber;
  /* newPatient.education   = education;
   newPatient.ocupation   = ocupation;
   newPatient.citizenship = citizenship;*/
  /* newPatient.address     = address;
   newPatient.pincode     = pincode;
   newPatient.city        = city;
   newPatient.state       = state;*/
 newPatient.save(function(err,saved){
       if(err){
          res.send(err)
       }else{  
        res.send(saved);
       }
})
//} 
//});
});

app.get('/newpatient',function(req,res){
  User.find(req.body, function(err, user) {
  if (err) throw err;

 res.send(user);
});
})
app.listen(3000);
console.log('show me result');

User.findOneAndUpdate({ email: '' },
                      { password:''}, function(err, user) {
  if (err) throw err;
  console.log(user);
});

User.findOneAndRemove({ email:'' }, function(err) {
  if (err) throw err;

  console.log('User deleted!');
});

User.find({}).where('created_at').gt(monthAgo).exec(function(err, users) {
  if (err) throw err;



  console.log(users);
});