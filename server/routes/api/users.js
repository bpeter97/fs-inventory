const router = require("express").Router();

// Require Helper
const helpers = require("../helpers/users");

// Middleware
const isAdmin = require("../../middleware/isAdmin");
const isSelfOrAdmin = require("../../middleware/isSelfOrAdmin");

// @route   api/users/
// @GET     Retrieves all of the users.
// @access  Mixed
router.route("/").get(helpers.getUsers).post(helpers.postUser);

// @route   GET api/users/:id
// @GET     Retrieves a single users information.
// @PATCH   Updates all or part of a single users information.
// @DELETE  Deletes a single user from the database.
// @access  Private
router.route("/:id").get(helpers.getUser);
// .patch(isSelfOrAdmin, helpers.patchUser)
// .delete(isAdmin, helpers.deleteUser);

router.route("/activate/").post(helpers.activateUser);

module.exports = router;
