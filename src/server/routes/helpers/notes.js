const _ = require("lodash");
const mongoose = require("mongoose");

// Require models
const Note = require("../../models/Note");

const { ObjectID } = require("mongodb");

// @route   GET api/Notes/
// @desc    Retrieves all Notes.
// @access  Private
exports.getNotes = (req, res) => {
    Note.find({})
    .then((notes) => {
        if (!notes) {
            return res.json({ error: "No notes found." });
        }
        res.send(notes);
    })
    .catch(e => res.status(404).json(e));
};
