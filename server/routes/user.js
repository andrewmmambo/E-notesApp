const express = require('express');
const User = require('../models/user');
const router = express.Router();

router
    .get('/getAllUsers', async (req, res) =>{
        try {
            const user = await User.getAllUsers();
            res.send(user);
        } catch(err) {
            res.status(401).send({message: err.message});
        }
    })

    .post('/login', async (req, res) =>{
        try{
            const user = await User.login(req.body);
            res.send( { ...user, password: undefined } );
        }
        catch(err) {
            res.status(401).send({message: err.message});
        }
    })

    .post('/registerUser', async (req, res) =>{
        try{
            const user = await User.registerUser(req.body);
            res.send( { ...user, password: undefined } );
        }
        catch(err) {
            res.status(401).send({message: err.message});
        }
    })

    .put('/editUser', async (req, res) => {
        try {
            const user = await User.editUser(req.body);
            res.send({...user, password: undefined});
        } catch(err){
            res.status(401).send({message: err.message});
        }
    })

    .delete('/deleteUser', async (req, res) => {
        try {
            User.deleteUser(req.body);
            res.send({success: "User deleted Successfully"});
        }catch(err) {
            res.status(401).send({message: err.message});
        }
    })

module.exports = router;