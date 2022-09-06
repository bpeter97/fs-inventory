const _ = require("lodash");
const { ObjectId } = require("mongodb");

// require model
const Warehouse = require("../../models/Warehouse");
const Notification = require("../../models/Notification");
const User = require("../../models/User");

// middleware
const sendNote = require("../../middleware/sendNote");

// validation files
const validateWarehouseInput = require("./../validation/warehouses");

// @route	GET api/warehouses/
// @desc	Retrieves all of the warehouses
// @access	Private
exports.getWarehouses = (req, res) => {
	Warehouse.find({})
		.then((warehouses) => {
			if (!warehouses) {
				return res.json({ error: "No warehouses found" });
			}
			res.send(warehouses);
		})
		.catch((e) => res.status(404).json(e));
};

// @route	POST api/warehouses/
// @desc	Creates a new warehouse
// @access	Private
exports.postWarehouse = (req, res) => {
	// check for validation errors
	const { errors, is_valid } = validateWarehouseInput(req.body);

	// send 400 error with validation errors if not valid.
	if (!is_valid) return res.status(400).json(errors);

	var body = _.pick(req.body, ["name"]);

	new Warehouse(body)
		.save()
		.then((warehouse) => {
			// check if it didn't save
			if (!warehouse) {
				errors.warehouse = "Unable to create the new warehouse";
				return res.status(400).json(errors);
			}

			// create notification
			sendNote(
				`A warehouse has been created: ${warehouse.name}`,
				req.headers.authorization
			);

			// send the warehouse
			res.send(warehouse);
		})
		.catch((err) => console.log(err));
};

// @route	GET api/warehouses/:id
// @desc	Retrieves a specific warehouse
// @access	Private
exports.getWarehouse = (req, res) => {
	let errors = {};

	if (!ObjectId.isValid(req.params.id)) {
		errors.warehouse = "There was no warehouse found";
		return res.status(400).json(errors);
	}

	Warehouse.findById(req.params.id)
		.then((warehouse) => {
			if (!warehouse) {
				return res.json({ error: "No warehouse was found" });
			}
			res.send(warehouse);
		})
		.catch((e) => res.status(404).json(e));
};

// @route   DELETE api/warehouses/:id
// @desc    Deletes a specific warehouse
// @access  Private
exports.deleteWarehouse = (req, res) => {
	let errors = {};

	if (!ObjectId.isValid(req.params.id)) {
		errors.warehouse = "There was no warehouse found";
		return res.status(400).json(errors);
	}

	Warehouse.findByIdAndRemove(req.params.id)
		.then((warehouse) => {
			if (!warehouse) {
				errors.warehouse = "Unable to find and remove the warehouse.";
				res.status(404).json(errors);
			}

			// create notification
			sendNote(
				`A warehouse has been deleted: ${warehouse.name}`,
				req.headers.authorization
			);

			res.json(warehouse);
		})
		.catch((e) => res.status(400).send(e));
};

// @route   PATCH api/warehouses/:id
// @desc    Updates a warehouse
// @access  Private
exports.patchWarehouse = (req, res) => {
	// check for validation errors
	var { errors, is_valid } = validateWarehouseInput(req.body);

	// send 400 error with validation errors if not valid.
	if (!is_valid) return res.status(400).json(errors);

	if (!ObjectId.isValid(req.params.id)) {
		errors.warehouse = "There was no warehouse found";
		return res.status(400).json(errors);
	}

	var update = _.pick(req.body, ["name"]);

	Warehouse.findByIdAndUpdate(req.params.id, update, { new: true })
		.then((warehouse) => {
			if (!warehouse) {
				return res.json({ error: "No warehouse was found." });
			}
			// create notification
			sendNote(
				`A warehouse has been updated: ${warehouse.name}`,
				req.headers.authorization
			);

			res.send(warehouse);
		})
		.catch((e) => res.status(404).json(e));
};
