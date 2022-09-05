const _ = require("lodash");

// require model
const Warehouse = require("../../models/Warehouse");
const Notification = require("../../models/Notification");
const User = require("../../models/User");

// validation files

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
	var body = _.pick(req.body, ["name"]);

	var newWarehouse = new Warehouse(body);
	newWarehouse
		.save()
		.then((warehouse) => {
			if (!warehouse) {
				errors.warehouse = "Unable to create the new warehouse";
				return res.status(400).json(errors);
			}

			User.findByToken(req.headers.authorization)
				.then((user) => {
					let full_name = `${user.first_name} ${user.last_name} ${user.suffix}`;

					var newNote = new Notification().generateNote(
						`A warehouse has been created by ${full_name.trim()}`,
						user
					);

					newNote
						.save()
						.then((note) => {
							if (!note) {
								errors.note =
									"The notification could not be created";
								res.status(400).json(errors);
							}
						})
						.catch((err) => console.log(err));
				})
				.catch((err) => console.log(err));

			res.send(warehouse);
		})
		.catch((err) => console.log(err));
};
