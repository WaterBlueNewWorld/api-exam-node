const express = require('express');
const bodyParser = require('body-parser');
const Db = require('./query');
const app = express();

app.use(bodyParser.json({
    limit:'100mb'
}));

app.use(bodyParser.urlencoded({
    extended:true,
    limit:'100mb'
}));


app.all('*', function(req,res,next){
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Methods','PUT,GET,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers','Content-Type');
    next();
});

app.post('/api/login', (req, res) => {
    let body = req.body;

    Db.login(body['user'], body['pass']).then((data) => {
        res.json(data[0][0][''])
    });
});

/*

    USERS

 */

app.get('/api/getUsers',function(req,res){
    Db.getAllUsers().then((data) => {
        res.status(201).json(data[0]);
    });
});

app.delete('/api/deleteUser', (req, res) => {
    let body = req.body;

    Db.deleteUser(body.id).then((data) => {
       res.status(200).json(data);
   });
});

app.post('/api/newUser', (req,res) => {
   let body = req.body;

   Db.newUser(body['user'], body['pass']).then((data) => {
       res.json(data);
   });
});

app.patch('/api/updateUser', (req,res) => {
    let body = req.body;

    Db.updateUser(body['id'], body['user'], body['pass']).then((data) => {
        res.json(data);
    });
});

/*

    GROUPS

 */
app.post('/api/new-group', (req,res) => {
    let body = req.body;

    Db.newGroup(body['name']).then((data) => {
        res.json(data);
    });
});

app.get('/api/groups',function(req,res){
    Db.getAllGroups().then((data)=>{
        res.status(201).json(data[0]);
    });
});

app.delete('/api/deleteGroup', (req,res) => {
   let body = req.body;

   Db.deleteGroup(body['id']).then((data) => {
       res.status(418).json(data);
   });
});

app.patch('/api/updateGroup', (req,res) => {
    let body = req.body;

    Db.updateGroup(body['id'], body['name']).then((data) => {
        res.status(200).json(data);
    });
});

/*

    MANAGEMENT

 */

app.post('/api/newPersonnel', (req,res) => {
    let body = req.body;

    Db.newPersonnel(body['name'], body['tel'], body['email'], body['position'], body['address']).then((data)=>{
       res.status(200).json(data);
    });
});

app.patch('/api/updatePersonnel', (req,res) => {
    let body = req.body;

    Db.updatePersonnel(body['id'], body['name'], body['tel'], body['email'], body['position'], body['address']).then((data)=>{
        res.status(200).json(data);
    });
});

app.get('/api/getPersonnel',function(req,res){
    Db.getAllPersonnel().then((data)=>{
        res.status(201).json(data[0]);
    });
});

app.delete('/api/deletePersonnel',(req,res) => {
    let body = req.body;

    Db.deletePersonnel(body['id']).then((data)=>{
        res.status(200).json(data);
    });
});

/*

    TEACHERS

 */

app.get('/api/getTeachers',function(req,res){
    Db.getAllTeachers().then((data)=>{
        res.status(201).json(data[0]);
    });
});

app.delete('/api/deleteTeacher',(req,res) => {
    let body = req.body;

    Db.deleteTeacher(body['id']).then((data)=>{
        res.status(200).json(data);
    });
});

app.patch('/api/updateTeacher', (req,res) => {
    let body = req.body;

    Db.updateTeacher(body['id'], body['name'], body['address'], body['telephone'], body['id_group']).then((data)=>{
        res.status(200).json(data);
    });
});

app.post('/api/newTeacher', (req,res) => {
    let body = req.body;

    Db.newTeacher(body['name'], body['address'], body['telephone'], body['id_group']).then((data)=>{
        res.status(200).json(data);
    });
});





app.listen(3000, function () {
    console.log('running at port: 3000');
});

