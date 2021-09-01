const router = require("express").Router();

// Require Helper
const helpers = require("../helpers/systemSettings");

// @route   api/systemsettings/
// @GET     Getting system settings
// @access  public
router.route("/").get(helpers.getSystemSettings);

router.route("/:id").patch(helpers.updateSystemSettings);

module.exports = router;
