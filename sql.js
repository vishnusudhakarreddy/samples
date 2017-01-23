var mysql =require('mysql');

var connction= mysql.createConnection({
    connctionLimit:100,
    host     : 'localhost',
  user     : 'root',
  password : 'Gaddam@123',
   database : 'subhash'
   

})
connction.connect();

var express= require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))




app.post('/students',function(req,res){

            
/*var students =[];
var st={ name:req.body.name,
        school:req.body.school,
        age: req.body.age,
        grade:req.body.grade};*/
 /*  students.push(st) ; 
newStudent.students=students;                  
*/

"CREATE TABLE students(studentID int,city varchar(255),area varchar(255),zipcode int,name varchar(255),school varchar(255),grade varchar(255),age int);"


 
    var query = "INSERT INTO ??(??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?)";
   var table = ["students", "city", "area", "zipcode", "sname", "school","grade", "age", req.body.city, req.body.area, req.body.zipcode, req.body.sname, req.body.school,req.body.grade, req.body.age];

    query = mysql.format(query, table);
      
     connction.query( query, function(err, rows) {
 if (err) {
            console.log(err);
        } else {
            res.send(rows)
        }

     });                          											

});
app.get('/students',function(req,res){
  connction.query('SELECT sname,age,school FROM students',req.body.sname, function(err, rows) {
            if (err) {
                res.send(err);
            } else 
               res.send(rows);
        });

  
/*//Students.find({students:{$elemMatch:{age:{$gt:5,$lt:10}}}},function(err, user) {
 
 res.send(user);
});*/
})
app.delete('/students',function(req,res){

 
 connction.query('DELETE FROM students WHERE sname="'+req.body.sname+'"', function(err, rows) {
            if (err) {
                res.send(err);
               
            } else 
               res.send(rows);
               
        });


})

app.listen(3000);
console.log('hiiiiiiiiiii');