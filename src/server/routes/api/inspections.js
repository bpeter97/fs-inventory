const router = require("express").Router();

// Require Helper
const helpers = require("../helpers/inspections");

// @route   api/inspections
// @GET     Retrieves all inspections.
// @POST    Creates a new Inspection.
// @access  public
router.route("/").get(helpers.getInspections).post(helpers.postInspection);

// @route   api/inspections/:id
// @GET     Creates a specific Inspection.
// @PATCH   Updates a specific Inspection.
// @DELETE  Deletes a specific Inspection.
// @access  public
router.route("/:id").get(helpers.getInspection).patch(helpers.patchInspection).delete(helpers.deleteInspection);

module.exports = router;
