const express = require('express');
const bodyParser = require('body-parser');
const cors  = require('cors');
const Db = require('./query');
const {getAllUsers} = require("./query");
const app = express();

app.use(bodyParser.json({
    limit:'100mb'
}));

app.use(bodyParser.urlencoded({
    extended:true,
    limit:'100mb'
}));

app.use(cors());

app.all('*', function(req,res,next){
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Methods','PUT,GET,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers','Content-Type');
    next();
});

app.get('/api/users',function(req,res){
    Db.getAllUsers().then((data)=>{
        res.status(201).json(data[0][0]);
    });
});

app.post('/api/user', (req, res) => {
    let body = req.body;

    Db.getUser(body.id).then((data) => {
       res.status(200).json(data[0][0] == null ? res.json({'error': 'No data'}): data[0][0]);
   });
});

app.put('/api/new-user', (req,res) => {
   let body = req.body;

   Db.newUser(body['user'], body['pass']).then((data) => {
       res.json(data);
   });
});

app.get('api/users', (req,res)=>{
   res.json(getAllUsers());
});


//for the login



// Update
//app.put('/api/user',(req,res)=>{
//    let request = req.body;
//    let query = "UPDATE users SET name='" request.name+"', pass='" request.pass+"', phone='" request.phone+"' WHERE iduser = " request.iduser+"";
//
//});
//
//// Delete user
//app.delete('/api/user',(req,res)=>{
//    let request = req.body;
//    let query = "DELETE users WHERE iduser = "+bd.iduser+"";
//    deadpool(req,res,query);
//});
//

// Students
app.get('/api/student',(req,res)=>{
    deadpool(req,res);
});

app.post('/api/student',(req,res)=>{
    deadpool(req,res);
});

app.put('/api/student',(req,res)=>{
    deadpool(req,res);
});

app.delete('/api/student',(req,res)=>{
    deadpool(req,res);
});

app.listen(3000, function () {
    console.log('running at port: 3000');
});

