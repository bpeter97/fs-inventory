const router = require("express").Router();

// Require Helper
const helpers = require("../helpers/users");

// @route   api/login
// @POST    Logs a user into the system.
// @access  public
router.route("/").post(helpers.loginUser);

module.exports = router;
