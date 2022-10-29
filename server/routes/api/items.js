const router = require("express").Router();

// Require Helper
const helpers = require("../helpers/Items");

// @route   api/items
// @POST    Creates an item.
// @GET		Retreives all items.
// @access  public
router.route("/").get(helpers.getItems).post(helpers.postItem);

// @route   GET api/Items/:id
// @GET     Retrieves a single item information.
// @PATCH   Updates all or part of a single item information.
// @DELETE  Deletes a single item from the database.
// @access  Private
router
	.route("/:id")
	.get(helpers.getItem)
	.patch(helpers.patchItem)
	.delete(helpers.deleteItem);

module.exports = router;
