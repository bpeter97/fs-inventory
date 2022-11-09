const _ = require("lodash");
const { ObjectId } = require("mongodb");

// require model
const Item = require("../../models/Item");
const Program = require("../../models/Program");
const Warehouse = require("../../models/Warehouse");

// middleware
const sendNote = require("../../middleware/sendNote");

// validation files
const validateItemInput = require("./../validation/items");

// @route	GET api/items/
// @desc	Retrieves all of the items
// @access	Private
exports.getItems = (req, res) => {
	Item.find({})
		.populate({ path: "program", model: Program })
		.populate({ path: "warehouse", model: Warehouse })
		.then((items) => {
			if (!items) {
				return res.json({ error: "No items found" });
			}
			res.send(items);
		})
		.catch((e) => res.status(404).json(e));
};

// @route	POST api/items/
// @desc	Creates a new item
// @access	Private
exports.postItem = (req, res) => {
	// check for validation errors
	const { errors, is_valid } = validateItemInput(req.body);

	// send 400 error with validation errors if not valid.
	if (!is_valid) return res.status(400).json(errors);

	var body = _.pick(req.body, [
		"item_name",
		"description",
		"donation",
		"client_access",
		"value",
		"location",
		"quantity",
		"photo",
		"program",
		"warehouse",
	]);

	if (req.file) {
		body.photo = req.file.filename;
	}

	new Item(body)
		.save()
		.then((item) => {
			// check if it didn't save
			if (!item) {
				errors.item = "Unable to create the new item";
				return res.status(400).json(errors);
			}

			// create notification
			sendNote(
				`A item has been created: ${item.item_name}`,
				req.headers.authorization
			);

			// send the item
			res.send(item);
		})
		.catch((err) => console.log(err));
};

// @route	GET api/items/:id
// @desc	Retrieves a specific item
// @access	Private
exports.getItem = (req, res) => {
	let errors = {};

	if (!ObjectId.isValid(req.params.id)) {
		errors.item = "There was no item found";
		return res.status(400).json(errors);
	}

	Item.findById(req.params.id)
		.then((item) => {
			if (!item) {
				return res.json({ error: "No item was found" });
			}
			res.send(item);
		})
		.catch((e) => res.status(404).json(e));
};

// @route   DELETE api/items/:id
// @desc    Deletes a specific item
// @access  Private
exports.deleteItem = (req, res) => {
	let errors = {};

	if (!ObjectId.isValid(req.params.id)) {
		errors.item = "There was no item found";
		return res.status(400).json(errors);
	}

	Item.findByIdAndRemove(req.params.id)
		.then((item) => {
			if (!item) {
				errors.item = "Unable to find and remove the item.";
				res.status(404).json(errors);
			}

			// create notification
			sendNote(
				`A item has been deleted: ${item.name}`,
				req.headers.authorization
			);

			res.json(item);
		})
		.catch((e) => res.status(400).send(e));
};

// @route   PATCH api/items/:id
// @desc    Updates a item
// @access  Private
exports.patchItem = (req, res) => {
	// check for validation errors
	var { errors, is_valid } = validateItemInput(req.body);

	// send 400 error with validation errors if not valid.
	if (!is_valid) return res.status(400).json(errors);

	// check to see if id is an objectId
	if (!ObjectId.isValid(req.params.id)) {
		errors.item = "There was no item found";
		return res.status(400).json(errors);
	}

	// set update object
	var update = _.pick(req.body, [
		"item_name",
		"description",
		"donation",
		"client_access",
		"value",
		"location",
		"quantity",
		"photo",
		"program",
		"warehouse",
	]);

	// update the item
	Item.findByIdAndUpdate(req.params.id, update, { new: true })
		.then((item) => {
			if (!item) {
				return res.json({ error: "No item was found." });
			}

			// create notification
			sendNote(
				`A item has been updated: ${item.name}`,
				req.headers.authorization
			);

			// send the item forward
			res.send(item);
		})
		.catch((e) => res.status(404).json(e));
};
