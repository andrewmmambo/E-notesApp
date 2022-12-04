const express = require('express');
const Note = require('../models/note');
const router = express.Router();

router
    .get('/read', async (req, res) => {
        try {
        const notes = await Note.getNote();
        res.send(notes);
        } catch(err) {
        res.status(401).send({message: err.message});
        }
    })

    .put('/edit', async (req, res) => {
        try {
            const note =  await Note.editNote(req.body);
            res.send({...note, password: undefined});
        } catch(error){
            res.status(401).send({message: error.message});
        }
    })

    .delete('/delete', async (req, res) => {
        try {
            Note.deleteNote(req.body.noteId);
            res.send({success: "Note deleted Successfully"});
        }catch(error) {
            res.status(401).send({message: error.message});
        }
    })

module.exports = router;