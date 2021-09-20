const router = require("express").Router();

// Require Helper
const helpers = require("../helpers/users");

// @route   api/register
// @POST    Creates a new user.
// @access  public
router.route("/").post(helpers.postUser);

module.exports = router;
