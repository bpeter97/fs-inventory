const router = require("express").Router();

// Require Helper
const helpers = require("../helpers/notes");

// @route   api/notes
// @GET     Retrieves all notes.
// @POST    Creates a new note.
// @access  public
router.route("/").get(helpers.getNotes).post(helpers.postNote);

// @route   api/notes/:id
// @GET     Creates a specific note.
// @PATCH   Updates a specific note.
// @DELETE  Deletes a specific note.
// @access  public
router.route("/:id").get(helpers.getNote).patch(helpers.updateNote).delete(helpers.deleteNote);

module.exports = router;
