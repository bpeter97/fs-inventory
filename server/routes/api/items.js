const router = require("express").Router();
const multer = require("multer");
const path = require("path");

// Require Helper
const helpers = require("../helpers/Items");

// Declare file storage location
const storage = multer.diskStorage({
	destination: "./client/public/img/uploads",
	filename: function (req, file, callback) {
		callback(
			null,
			file.fieldname + "-" + Date.now() + path.extname(file.originalname)
		);
	},
});

const fileFilter = (req, file, callback) => {
	let pattern = /jpg|png|svg/;
	if (pattern.test(path.extname(file.originalname))) {
		callback(null, true);
	} else {
		callback("Error: not a valid file");
	}
};

const upload = multer({ storage: storage, fileFilter });

// @route   api/items
// @POST    Creates an item.
// @GET		Retreives all items.
// @access  public
router
	.route("/")
	.get(helpers.getItems)
	.post(upload.single("photo"), helpers.postItem);

// @route   GET api/Items/:id
// @GET     Retrieves a single item information.
// @PATCH   Updates all or part of a single item information.
// @DELETE  Deletes a single item from the database.
// @access  Private
router
	.route("/:id")
	.get(helpers.getItem)
	.patch(upload.single("photo"), helpers.patchItem)
	.delete(helpers.deleteItem);

module.exports = router;
