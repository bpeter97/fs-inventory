const router = require("express").Router();

// Require Helper
const helpers = require("../helpers/Calls");

// @route   api/Calls
// @GET     Retrieves all Calls.
// @POST    Creates a new Call.
// @access  public
router.route("/").get(helpers.getCalls).post(helpers.postCall);

// @route   api/Calls/:id
// @GET     Creates a specific Call.
// @PATCH   Updates a specific Call.
// @DELETE  Deletes a specific Call.
// @access  public
// router.route("/:id").get(helpers.getCall).patch(helpers.patchCall).delete(helpers.deleteCall);

module.exports = router;
