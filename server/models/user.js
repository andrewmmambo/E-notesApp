const con = require("./db_connect");

async function createTable()
{
    let sql = `CREATE TABLE IF NOT EXISTS users(
        user_id INT NOT NULL AUTO_INCREMENT,
        fname VARCHAR(255),
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255),
        CONSTRAINT user_pk PRIMARY KEY(user_id)
    );`
     await con.query(sql);
}
createTable();

async function getAllUsers()
 {
    const  sql = `SELECT * FROM users;`;
    let allUsers = await con.query(sql);
    console.log(allUsers);
 }

async function registerUser(fname, email, password)
{
    let cUser = await getUser(user.email);
    if(cUser.length > 0) throw Error("Email already in use");

    const sql = `INSERT INTO users(fname, email, password)
               VALUES('${fname}','${email}','${password}');`;
     await con.query(sql);
    return await login(email, password);
}

async function getUser(user)
{
    let sql;
    if(user.userId){
        sql =`SELECT * FROM users
        WHERE user_id = ${user.userId};`
    }else {
        sql = `SELECT * FROM users
        WHERE email = "${user.email}";`
    }
    return await con.query(sql);
}

async function editUser(user)
{
    const sql = `UPDATE users SET email = "${user.email}"
    WHERE user_id = ${user.userId}`;

    await con.query(sql);
    let updatedUser = await getUser(user);
    return updatedUser[0];
}

async function deleteUser(userId) {
    const sql = `DELETE FROM users
    WHERE user_id = ${userId}`;
    await con.query(sql);
}

async function login(email, password)
{
    const user = await userExists(email);
    if(!user [0]) throw Error('User not found');
    if(user [0].user_password !== password) throw Error('Password is incorrect.');

    return user [0];
}

module.exports = { getAllUsers, registerUser, getUser, editUser, deleteUser, login };