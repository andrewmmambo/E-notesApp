const express = require('express');
const User = require('../models/user');
const router = express.Router();

router
.get('/login', async (req, res) =>{
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

module.exports = router;