var express = require("express");
var mysql = require("mysql");
var bodyparser= require("body-parser");
var cors= require("cors");
var paginate = require("jw-paginate");

var app=express();

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors());
console.log("server started");
var connection = mysql.createConnection({
  host : "localhost",
  user : "root",
  password : "root",
  database : "cal-app"
});
connection.connect(function(err){
  if(err){
    console.log(err);
  }
  else{
    console.log("connected !!");
  }
})


app.listen(3000)

app.post("/cal-expr",function(req , res){
  var result=eval(req.body.expr);
  var qr="INSERT INTO ntable(expr,result,log) VALUES ("+"'"+req.body.expr+"','"+result+"',"+"now())";
  connection.query(qr,function(err,rows,fields){
    if(err){
      console.log(err);
    }
    else{
      return res.send(rows);
    }
  })
})
app.get("/cal-expr-id",function(req , res){
  var result=eval(req.body.expr);
  var qr="select result from ntable order by id desc limit 1;";
  connection.query(qr,function(err,rows,fields){
    if(err){
      console.log(err);
    }
    else{
      return res.send(rows);
    }
  })
})
//paginate
app.get("/page-get/:id",function(req,res,next){
  var qr="select * from ntable order by id desc;";
  connection.query(qr,function(err,rows,fields){
    if(err){
      console.log(err);
    }
    else{
      const pageitm= parseInt(req.params.id);
      const pagesize=10;
      const pager = paginate(rows.length,pageitm,pagesize);
      const pageofitems = rows.slice(pager.startIndex,pager.endIndex+1);
      return res.json({pager , pageofitems});

    }
  })
})
