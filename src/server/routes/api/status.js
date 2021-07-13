const router = require("express").Router();

// Require Helper
const helpers = require("../helpers/status");

// @route   api/status
// @GET     Retrieves all status.
// @POST    Creates a new status.
// @access  public
router.route("/").get(helpers.getStatus).post(helpers.postStatus);

// @route   api/status/:id
// @GET     Creates a specific status.
// @PATCH   Updates a specific status.
// @DELETE  Deletes a specific status.
// @access  public
router.route("/:id").get(helpers.getStatusById).patch(helpers.patchStatus).delete(helpers.deleteStatus);

module.exports = router;
