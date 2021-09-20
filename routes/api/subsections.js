const router = require("express").Router();

// Require Helper
const helpers = require("../helpers/subsections");

// @route   api/subsections
// @GET     Retrieves all subsections.
// @POST    Creates a new subsection.
// @access  public
router.route("/").get(helpers.getSubsections).post(helpers.postSubsection);

// @route   api/subsections/:id
// @GET     Creates a specific subsection.
// @PATCH   Updates a specific subsection.
// @DELETE  Deletes a specific subsection.
// @access  public
router.route("/:id").get(helpers.getSubsection).patch(helpers.patchSubsection).delete(helpers.deleteSubsection);

module.exports = router;
