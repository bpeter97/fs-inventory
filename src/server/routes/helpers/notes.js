const _ = require("lodash");
const mongoose = require("mongoose");

// Require models
const Note = require("../../models/Note");
const validateNoteInput = require("../validation/notes");

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

// @route   POST api/Notes/
// @desc    Creates a note.
// @access  Private
exports.postNote = (req, res) => {
    // check for validation errors
    const { errors, is_valid } = validateNoteInput(req.body);

    // send 400 error with validation errors if not valid.
    if (!is_valid) return res.status(400).json(errors);

    // Set the properties for the new Note
    var body = _.pick(req.body, [
        "note",
    ]);

    // Create the new Note
    var newNote = new Note(body);

    // Save the new Note to the DB, lastly return the note.
    newNote
        .save()
        .then((note) =>  res.send(note))
        .catch((err) => console.log(err));
};

// @route   GET api/Notes/:id
// @desc    Gets a specific note.
// @access  Private
exports.getNote = (req, res) => {
    let errors = {};

    if (!ObjectID.isValid(req.params.id)) {
        errors.note = "There was no note found.";
        return res.status(400).json(errors);
    }

    Note.findById(req.params.id)
        .then((note) => {
            if (!note) {
                return res.json({ error: "There was no note found." });
            }
                res.send(note);
            })
            .catch((e) => res.status(404).json(e));
};

// @route   PATCH api/Notes/:id
// @desc    Updates a specific note.
// @access  Private
exports.patchNote = (req, res) => {
    // check for validation errors
    const { errors, is_valid } = validateNoteInput(req.body);

    // send 400 error with validation errors if not valid.
    if (!is_valid) return res.status(400).json(errors);

    // Check ID
    if (!ObjectID.isValid(req.params.id)) {
        errors.note = "There was no note found.";
        return res.status(400).json(errors);
    }

    var update = _.pick(req.body, [
        "note",
      ]);

    Note.findByIdAndUpdate(req.params.id, update, { new: true })
    .then((note) => {
      if (!note) {
        return res.json({ error: "There was no note found." });
      }
      res.send(note);
    })
    .catch((e) => res.status(404).json(e));
};

// @route   DELETE api/Notes/:id
// @desc    Updates a specific note.
// @access  Private
exports.deleteNote = (req, res) => {

    // Check ID
    if (!ObjectID.isValid(req.params.id)) {
        errors.note = "There was no note found.";
        return res.status(400).json(errors);
    }

    Note.findByIdAndRemove(req.params.id)
    .then((note) => {
      if (!note) {
        errors.note = "There was no note found.";
        res.status(404).json(errors);
      }

      res.json(note);
    })
    .catch((e) => res.status(400).send(e));
};