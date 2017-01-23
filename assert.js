var User    = require('./mongoose');

var express = require('express');
var app     = express();

var assert  = require('assert');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/login',function(req,res){

  var name     = req.body.name;
  var email    = req.body.email;
  var password = req.body.password;
  var phone    = req.body.phone;
  var location = req.body.location;

//assert.equal('name',name,'name required')//.notEmpty();
//assert.equal('email',email,'email required').notEmpty();
assert.equal('email',email,'email required')//.isEmail();
//assert.equal('password',password,'6 to 20 characters required').len(6, 20);
//assert.equal('phone',phone,'email required').isInt();
       
console.log('result');
       var newUser  = new User();
 
	       newUser.name = name;
	       newUser.email = email;
	       newUser.password = password;
	       newUser.phone = phone;
	       newUser.location = location;



  newUser.save(function(err,result){

  if(err){
          res.send(err)
       }else{  
        res.send(result);
       }


});
});
app.listen(3000);
 console.log('show me result');