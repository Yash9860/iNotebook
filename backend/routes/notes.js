const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser'); // Adjust path as needed
const Notes = require('../models/Notes'); // Adjust path as needed
const User = require('../models/User');

//get all notes details GET request
router.get('/fetchallnotes', fetchuser, async (req, res) => {

    try {
        const notes = await Notes.find({ user: req.user.id })
        console.log(notes);
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured")
    }
    
})


//save notes
router.post('/savenotes', fetchuser, [
    body('title', 'Please enter a title').isLength({ min: 3 }),
    body('description', 'Please enter a description with at least 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });
        }

        console.log('User ID from token:', req.user.id); // Debugging: Log user ID

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).send("User not found");
        }

        const note = new Notes({
            title,
            description,
            tag,
            user: req.user.id
        });

        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.error('Error saving note:', error.message); // Debugging: Log the error
        res.status(500).send("Some error occurred");
    }
});


// update note 
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        
        // Initialize newNote as an object
        const newNote = {};
        if (title) newNote.title = title;
        if (description) newNote.description = description;
        if (tag) newNote.tag = tag;

        console.log(newNote); // Debugging: Log the newNote object
        // find the note
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Note not found");
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Unauthorized");
        }

        // Update the note
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note });

    } catch (error) {
        console.error('Error updating note:', error.message); // Debugging: Log the error
        res.status(500).send("Some error occurred");
    }
});


// delete note

router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // find the note
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Note not found");
        }

        // allow deletion
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Unauthorized");
        }

        // Update the note
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json("Success : note has be deleted");

    } catch (error) {
        console.error('Error updating note:', error.message); // Debugging: Log the error
        res.status(500).send("Some error occurred");
    }
});


module.exports = router;