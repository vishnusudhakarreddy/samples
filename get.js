var mongodb = require('mongodb')
var mongolcient = mongodb.MongoClient;

var gf = require('./function.js');
var express = require('express');
var app =express();

app.get('/players',gf.qfun1);


app.listen(3000);
console.log('success');