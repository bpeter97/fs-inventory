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
