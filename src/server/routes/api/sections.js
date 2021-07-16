const router = require("express").Router();

// Require Helper
const helpers = require("../helpers/sections");

// @route   api/sections
// @GET     Retrieves all sections.
// @POST    Creates a new section.
// @access  public
router.route("/").get(helpers.getSections).post(helpers.postSection);

// @route   api/sections/:id
// @GET     Creates a specific Section.
// @PATCH   Updates a specific Section.
// @DELETE  Deletes a specific Section.
// @access  public
router.route("/:id").get(helpers.getSection).patch(helpers.patchSection).delete(helpers.deleteSection);

module.exports = router;
