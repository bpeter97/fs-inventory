const router = require("express").Router();

// Require Helper
const helpers = require("../helpers/warehouses");

// @route   api/warehouses
// @POST    Creates a warehouse.
// @GET		Retreives all warehouses.
// @access  public
router.route("/").get(helpers.getWarehouses).post(helpers.postWarehouse);

// @route   GET api/warehouses/:id
// @GET     Retrieves a single warehouse information.
// @PATCH   Updates all or part of a single warehouse information.
// @DELETE  Deletes a single warehouse from the database.
// @access  Private
router
	.route("/:id")
	.get(helpers.getWarehouse)
	.patch(helpers.patchWarehouse)
	.delete(helpers.deleteWarehouse);

module.exports = router;
