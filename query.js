const  config = require('./config');
const  sql = require('mssql');

async  function getAllUsers() {
  try {
    let conn = await sql.connect(config);
    let query = await conn.request().query("SELECT * from api_final_exam.USERS");
    return query.recordsets;
  }
  catch (error) {
    console.log(error);
  }
}

async  function getUser(userId) {
  try {
    let conn = await  sql.connect(config);
    let query = await  conn.request()
    .input('input', sql.Int, userId)
    .query("SELECT * from api_final_exam.USERS where id = @input");
    return  query.recordsets;
  }
  catch (error) {
    console.log(error);
  }
}

async function newUser(username, password){
  try{
    let conn = await sql.connect(config);
    let query = await conn.request()
    .input('name', sql.NVarChar, username)
    .input('pass', sql.NVarChar, password)
    .query("INSERT INTO api_final_exam.USERS (users, pass) VALUES(@name, @pass)");
    return query.recordsets;
  }catch (error){
    console.log(error);
  }
}



module.exports = {
  newUser:  newUser,
  getUser:  getUser,
  getAllUsers: getAllUsers,
}