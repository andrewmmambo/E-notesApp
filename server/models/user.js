const users = [
    {
        fname: "jono",
        email: "user1@tmail.com",       
        password: "chauwa7"
    },
    {
        fname: "drew",
        email: "user2@tmail.com",       
        password: "mambo7"
    },
    {
        fname: "gamu",
        email: "user3@tmail.com",      
        password: "tronixx"
    },
];

function getAllUsers()
 {
    return users;
 }


function login(user)
{
    let cUser = users.filter((u) => u.email === email);
    if(cUser [0]) throw Error('User not found');
    if(cUser [0].password !== user.password) throw Error('Password is incorrect.');

    return cUser [0];
}

module.exports = { getAllUsers, login };