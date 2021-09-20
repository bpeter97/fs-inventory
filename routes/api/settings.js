const router = require("express").Router();

// Require Helper
const helpers = require("../helpers/settings");

// @route   api/settings/:id
// @GET    Creates a specific users' settings.
// @access  public
router.route("/:id").get(helpers.getSettings).patch(helpers.updateSettings);

module.exports = router;
