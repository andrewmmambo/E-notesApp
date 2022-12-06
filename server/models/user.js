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

async function registerUser(user)
{
    let cUser = await getUser(user.email);
    if(cUser.length > 0) throw Error("Email already in use");

    const sql = `INSERT INTO users(fname, email, password)
               VALUES("${user.fname}","${user.email}","${user.password}");`
     await con.query(sql);
    return await login(user);
}

async function getUser(user)
{
    let sql;
    console.log(user)
    if(user.user_id){
        sql =`SELECT * FROM users
        WHERE user_id = ${user.user_id};`
    }else {
        sql = `SELECT * FROM users
        WHERE email = "${user.email}";`
    }
    return await con.query(sql);
}

async function editUser(user)
{
    const sql = `UPDATE users SET email = "${user.email}"
    WHERE user_id = ${user.user_id}`;

    await con.query(sql);
    let updatedUser = await getUser(user);
    return updatedUser[0];
}

async function deleteUser(user)
{
    let sql = `DELETE FROM users
    WHERE user_id = ${user.user_id}
    `
    await con.query(sql);
}

async function login(user)
{
    const cUser = await getUser(user);
    if(!cUser [0]) throw Error('User not found');
    if(cUser [0].password !== user.password) throw Error('Password is incorrect.');

    return cUser [0];
}

module.exports = { getAllUsers, registerUser, getUser, editUser, deleteUser, login };