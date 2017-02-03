var mysql = require('mysql');
var express = require('express');
var app = express();

var bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({
    extended: true
}));

var connection = mysql.createConnection({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: 'Gaddam@123',
    database: 'subhash',
    debug: true

})

connection.connect();

app.get('/emp',function(req,res){



var query = "INSERT INTO users(??,??,??) VALUES (?,?,?)";
 var table = [ "id", "name", "mobile",  1, "subhash",26 ];

     query = mysql.format(query, table);
 connection.query(query, function(e, list) {
        if (e) {
            res.send({ status: "error", message: query });
        } else {

            res.send({ status: "success", message: list })
        }
    })

})
app.listen(3000);
console.log('hii');


