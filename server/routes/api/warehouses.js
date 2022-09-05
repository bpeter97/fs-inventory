const router = require("express").Router();

// Require Helper
const helpers = require("../helpers/warehouses");

// @route   api/warehouses
// @POST    Creates a warehouse.
// @GET		Retreives all warehouses.
// @access  public
router.route("/").get(helpers.getWarehouses).post(helpers.postWarehouse);

module.exports = router;
