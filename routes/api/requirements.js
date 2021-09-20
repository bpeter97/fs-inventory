const router = require("express").Router();

// Require Helper
const helpers = require("../helpers/requirements");

// @route   api/requirements
// @GET     Retrieves all requirements.
// @POST    Creates a new requirement.
// @access  public
router.route("/").get(helpers.getRequirements).post(helpers.postRequirement);

// @route   api/requirements/:id
// @GET     Creates a specific Requirement.
// @PATCH   Updates a specific Requirement.
// @DELETE  Deletes a specific Requirement.
// @access  public
router.route("/:id").get(helpers.getRequirement).patch(helpers.patchRequirement).delete(helpers.deleteRequirement);

module.exports = router;
