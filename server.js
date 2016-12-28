var express = require('express')

var app = express();
var fs = require('fs')


var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }))

 
/*app.post('/users',function(req,res){

var id = req.body.id;               //this is transfer to file
var name = req.body.name;
var role = req.body.role;
var company = req.body.company;
var adress = req.body.adress;
console.log(req.body);

fs.writeFile('./file.json', JSON.stringify(req.body),  function (err) {
  console.log(err);
});
})*/
/*
app.get('/users',function(req,res){

var id = req.body.id;
var name = req.body.name;
var role = req.body.role;              //this is transfer file data to browser
var company = req.body.company;
var adress = req.body.adress;
var data = require('./file.json')
res.send(data);
})*/


app.listen(3000);

console.log('hi subhash');