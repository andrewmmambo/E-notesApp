const express = require('express');
const User = require('../models/user');
const router = express.Router();

router
    .get('/', async (req, res) =>{
        try {
            const users = await User.getAllUsers();
            res.send(users);
        } catch(err) {
            res.status(401).send({message: err.message});
        }
    })

    .post('/login', async (req, res) =>{
        try{
            const user = await User.login(req.body.email, req.body.password);
            res.send( { ...user, password: undefined } );
        }
        catch(error) {
            res.status(401).send({message: error.message});
        }
    })

    .post('/registerUser', async (req, res) =>{
        try{
            const user = await User.registerUser(req.body.fname, req.body.email, req.body.password);
            res.send( { ...user, password: undefined } );
        }
        catch(error) {
            res.status(401).send({message: error.message});
        }
    })

    .put('/edit', async (req, res) => {
        try {
            const user = await User.editUser(req.body);
            res.send({...user, password: undefined});
        } catch(error){
            res.status(401).send({message: error.message});
        }
})

.delete('/delete', async (req, res) => {
    try {
        User.deleteUser(req.body.userId);
        res.send({success: "User deleted Successfully"});
    }catch(error) {
        res.status(401).send({message: error.message});
    }
})

module.exports = router;