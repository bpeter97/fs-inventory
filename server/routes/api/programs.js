const router = require("express").Router();

// Require Helper
const helpers = require("../helpers/programs");

// @route   api/programs
// @POST    Creates a Program.
// @GET		Retreives all Programs.
// @access  public
router.route("/").get(helpers.getPrograms).post(helpers.postProgram);

// @route   GET api/programs/:id
// @GET     Retrieves a single Program information.
// @PATCH   Updates all or part of a single Program information.
// @DELETE  Deletes a single Program from the database.
// @access  Private
router
	.route("/:id")
	.get(helpers.getProgram)
	.patch(helpers.patchProgram)
	.delete(helpers.deleteProgram);

module.exports = router;
