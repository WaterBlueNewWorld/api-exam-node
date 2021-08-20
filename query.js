const config = require('./config');
const sql = require('mssql');

async function login(name, password){
  try{
    let conn = await sql.connect(config);
    let query = await conn.request()
        .input('user', sql.NVarChar, name)
        .input('password', sql.NVarChar, password)
        .query("SELECT CASE WHEN EXISTS (SELECT * FROM api_final_exam.USERS WHERE users = @user AND pass = @password)THEN CAST(1 AS BIT)ELSE CAST(0 AS BIT) END");
    return query.recordsets;
  }catch (e) {
    console.log(e);
  }
}

/*

    Schools
  
*/

async function getAllSchools() {
  try {
    let conn = await sql.connect(config);
    let query = await conn.request().query("SELECT * from api_final_exam.school");
    return query.recordsets;
  }
  catch (error) {
    console.log(error);
  }
}

async function insertSchool(name, registry, address, telephone, school_zone, director){
  try{
    let conn = await sql.connect(config);
    let query = await conn.request()
        .input('name', sql.NVarChar, name)
        .input('registry', sql.Int, registry)
        .input('address', sql.NVarChar, address)
        .input('telephone', sql.Int, telephone)
        .input('school_zone', sql.NVarChar, school_zone)
        .input('director', sql.NVarChar, director)
        .query("INSERT INTO api_final_exam.school (school_name, s_registry, school_address, telephone, school_zone, director) VALUES(@name, @registry, @address, @telephone, @school_zone, @director)");
      return query.recordsets;
  }catch (e){

  }
}

/*

    USERS

 */

async function getAllUsers() {
  try {
    let conn = await sql.connect(config);
    let query = await conn.request().query("SELECT * from api_final_exam.USERS");
    return query.recordsets;
  }
  catch (error) {
    console.log(error);
  }
}

async function updateUser(id, name, password){
  try{
    let conn = await sql.connect(config);
    let query = await conn.request()
        .input('id', sql.Int, id)
        .input('name', sql.NVarChar, name)
        .input('password', sql.NVarChar, password)
        .query("UPDATE api_final_exam.users SET users = @name, pass = @password WHERE id = @id");
    return query.recordsets;
  }catch (e) {
    console.log(e);
  }
}

async function deleteUser(userId) {
  try {
    let conn = await  sql.connect(config);
    let query = await  conn.request()
        .input('input', sql.Int, userId)
        .query("DELETE FROM api_final_exam.USERS where id = @input");
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

/*

    GROUPS

 */

async function newGroup(name){
  try{
    let conn = await sql.connect(config);
    let query = await conn.request()
        .input('name', sql.NVarChar, name)
        .query("INSERT INTO api_final_exam.groups (group_name) VALUES(@name)");
    return query.recordsets;
  }catch (error){
    console.log(error);
  }
}

async function getAllGroups() {
  try {
    let conn = await sql.connect(config);
    let query = await conn.request().query("SELECT * from api_final_exam.groups");
    return query.recordsets;
  }
  catch (error) {
    console.log(error);
  }
}

async function deleteGroup(id){
  try{
    let conn = await sql.connect(config);
    let query = await conn.request()
        .input('id', sql.Int, id)
        .query("DELETE FROM api_final_exam.groups WHERE id = @id");
    return query.recordsets;
  }catch (e) {
    return e;
  }
}

async function updateGroup(id, name){
  try{
    let conn = await sql.connect(config);
    let query = await conn.request()
        .input('id', sql.Int, id)
        .input('name', sql.NVarChar, name)
        .query("UPDATE api_final_exam.groups SET group_name = @name WHERE id = @id");
    return query.recordsets;
  }catch (e) {
    console.log(e);
  }
}

/*

    MANAGEMENT

 */

async function newPersonnel(name, telephone, email, position, address){
  try{
    let conn = await sql.connect(config);
    let query = await conn.request()
        .input('name', sql.NVarChar, name)
        .input('tel', sql.Int, telephone)
        .input('email', sql.NVarChar, email)
        .input('position', sql.NVarChar, position)
        .input('address', sql.NVarChar, address)
        .query("INSERT INTO api_final_exam.management (m_name, telephone, email, position, m_address) VALUES (@name, @tel, @email, @position, @address)");
    return query.recordsets;
  }catch (e) {
    console.log(e);
  }
}

async function updatePersonnel(id, name, telephone, email, position, address){
  try{
    let conn = await sql.connect(config);
    let query = await conn.request()
        .input('id', sql.Int, id)
        .input('name', sql.NVarChar, name)
        .input('tel', sql.Int, telephone)
        .input('email', sql.NVarChar, email)
        .input('position', sql.NVarChar, position)
        .input('address', sql.NVarChar, address)
        .query("UPDATE api_final_exam.management SET m_name = @name, telephone = @tel, email = @email, position = @position , m_address = @address WHERE id = @id");
    return query.recordsets;
  }catch (e) {
    console.log(e);
  }
}

async function deletePersonnel(id){
  try{
    let conn = await sql.connect(config);
    let query = await conn.request()
        .input('id', sql.Int, id)
        .query("DELETE FROM api_final_exam.management WHERE id = @id");
    return query.recordsets;
  }catch (e) {
    return e;
  }
}

async function getAllPersonnel() {
  try {
    let conn = await sql.connect(config);
    let query = await conn.request().query("SELECT * from api_final_exam.management");
    return query.recordsets;
  }
  catch (error) {
    console.log(error);
  }
}

/*

    Teachers

 */

async function newTeacher(name, address, telephone, groupID){
  console.log(name + " " + address + " " + telephone + " " + groupID )
  try{
    let conn = await sql.connect(config);
    let query = await conn.request()
        .input('name', sql.NVarChar, name)
        .input('address', sql.NVarChar, address)
        .input('telephone', sql.Int, telephone)
        .input('group', sql.Int, groupID)
        .query("INSERT INTO api_final_exam.teachers (teacher_name, teacher_address, telephone, id_group) VALUES (@name, @address, @telephone, @group)");
    return query.recordsets;
  }catch (e) {
    console.log(e);
  }
}

async function updateTeacher(id, name, address, telephone, groupID){
  try{
    let conn = await sql.connect(config);
    let query = await conn.request()
        .input('id', sql.Int, id)
        .input('name', sql.NVarChar, name)
        .input('address', sql.NVarChar, address)
        .input('tel', sql.Int, telephone)
        .input('group', sql.Int, groupID)
        .query("UPDATE api_final_exam.teachers SET teacher_name = @name, teacher_address = @address, telephone = @tel, id_group = @group WHERE id = @id");
    return query.recordsets;
  }catch (e) {
    console.log(e);
  }
}

async function deleteTeacher(idT){
  console.log(idT);
  try{
    let conn = await sql.connect(config);
    let query = await conn.request()
        .input('idT', sql.Int, idT)
        .query("DELETE FROM api_final_exam.teachers WHERE id = @idT");
    return query.recordsets;
  }catch (e) {
    return e;
  }
}

async function getAllTeachers() {
  try {
    let conn = await sql.connect(config);
    let query = await conn.request().query("SELECT * from api_final_exam.teachers");
    return query.recordsets;
  }
  catch (error) {
    console.log(error);
  }
}


module.exports = {
  newUser:  newUser,
  getAllUsers: getAllUsers,
  deleteUser: deleteUser,
  updateUser: updateUser,
  newGroup: newGroup,
  getAllGroups: getAllGroups,
  deleteGroup: deleteGroup,
  updateGroup: updateGroup,
  newPersonnel: newPersonnel,
  getAllPersonnel: getAllPersonnel,
  updatePersonnel: updatePersonnel,
  deletePersonnel: deletePersonnel,
  newTeacher: newTeacher,
  updateTeacher: updateTeacher,
  deleteTeacher: deleteTeacher,
  getAllTeachers:getAllTeachers,
  getAllSchools: getAllSchools,
  insertSchool: insertSchool,
  login: login
}