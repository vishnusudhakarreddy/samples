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

app.post('/emp', function(req, res) {
    var id = req.body.id;
    var firstname = req.body.firstname;
    var email = req.body.email;
    var education = req.body.education;
    var mobile = req.body.mobile;
    var age = req.body.age;
    var query = "CREATE TABLE IF NOT EXISTS `zozz` (`id` int(20) NOT NULL, `firstname` varchar(255) NOT NULL, `email` varchar(50) NOT NULL, `education` varchar(30) NOT NULL, `mobile` int(20) NOT NULL)" // ENGINE = InnoDB DEFAULT CHARSET = latin1 AUTO_INCREMENT = 3;
    var status = "free";
    var query = "INSERT INTO ??(??,??,??,??,??,??) VALUES (?,?,?,?,?,?)";
    var table = ["zozz", "id", "firstname", "email", "education", "mobile", "age", id, firstname, email, education, mobile, age];

    // var query = " ALTER TABLE zozz ADD age varchar(40) NOT NULL  AFTER mobile ";


    query = mysql.format(query, table);
    connection.query(query, function(e, list) {
        if (e) {
            res.send({
                status: "error",
                message: e
            });
        } else {

            res.send({
                status: "success",
                message: list
            })
        }
    })

})
app.get('/emp', function(req, res) {
    var query = "SELECT * FROM zozz";
    connection.query(query, function(e, list) {
        if (e) {
            res.send({
                status: "error",
                message: e
            });
        } else {

            res.send({
                status: "success",
                message: list
            })
        }
    })

})
app.put('/emp', function(req, res) {
    var id = req.body.id;
    var firstname = req.body.firstname;
    var query = 'UPDATE zozz SET firstname = "' + firstname + '" WHERE id = "' + id + '"';

    connection.query(query, function(e, list) {
        if (e) {
            res.send({
                status: "error",
                message: e
            });
        } else {

            res.send({
                status: "success",
                message: list
            })
        }
    })

})
app.delete('/emp', function(req, res) {
    var id = req.body.id;
    var query = "DELETE FROM zozz WHERE id=" + id + "";
    //var query = "TRUNCATE TABLE  zozz; "//delete data not TABLE
    // var query="DROP TABLE  zozz; "//deletetable
    connection.query(query, function(e, list) {
        if (e) {
            res.send({
                status: "error",
                message: e
            });
        } else {

            res.send({
                status: "success",
                message: list
            })
        }
    })
})
app.listen(3000);
console.log('hii');
