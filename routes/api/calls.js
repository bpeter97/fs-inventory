const router = require("express").Router();

// Require Helper
const helpers = require("../helpers/calls");

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
router.route("/:id").delete(helpers.deleteCall).get(helpers.getCall).patch(helpers.updateCall);

module.exports = router;
