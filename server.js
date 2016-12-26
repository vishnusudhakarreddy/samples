var express = require('express')

var app = express();
var fs = require('fs')

//var router = require('./router')


var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }))

 
// parse application/json 


/*app.get('/users',function(req,res){

  res.send(req.query.name)

})
app.get('/users/:id',function(req,res){

res.send(req.params.id)

})*/

//app.post('/users',router.findData);
//app.put('/users',router.findData);
//app.delete('/users',router.findData);

app.post('/users',function(req,res){

var id = req.body.id;
var name = req.body.name;
var role = req.body.role;
var company = req.body.company;
var adress = req.body.adress;
console.log(req.body)
// res.send(req.body)

//var data = require('./file.json');
fs.writeFile('./file.json', JSON.stringify(req.body),  function (err) {
  console.log(err);
});
})




app.listen(3000);

console.log('hi subhash');