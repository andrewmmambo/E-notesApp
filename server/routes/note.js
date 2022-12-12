const express = require('express');
const Note = require('../models/note');
const router = express.Router();

router
    .post('/createNote', async (req, res) =>{
        try{
            const note = await Note.createNote(req.body);
            res.send(note);
        }
        catch(err) {
            res.status(401).send({message: err.message});
        }
    })

    .post('/getNote', async (req, res) => {
        try {
        const notes = await Note.getNote(req.body);
        res.send(notes);
        } catch(err) {
        res.status(401).send({message: err.message});
        }
    })
/*
    .put('/edit', async (req, res) => {
        try {
            const note =  await Note.editNote(req.body);
            res.send({...note, password: undefined});
        } catch(err){
            res.status(401).send({message: err.message});
        }
    })

    .delete('/delete', async (req, res) => {
        try {
            Note.deleteNote(req.body);
            res.send({success: "Note deleted Successfully"});
        }catch(err) {
            res.status(401).send({message: err.message});
        }
    })
*/
module.exports = router;