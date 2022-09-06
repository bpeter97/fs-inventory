const _ = require("lodash");
const { ObjectId } = require("mongodb");

// require model
const Program = require("../../models/Program");
const Notification = require("../../models/Notification");
const User = require("../../models/User");

// middleware
const sendNote = require("../../middleware/sendNote");

// validation files
const validateProgramInput = require("./../validation/programs");

// @route	GET api/Programs/
// @desc	Retrieves all of the Programs
// @access	Private
exports.getPrograms = (req, res) => {
	Program.find({})
		.then((programs) => {
			if (!programs) {
				return res.json({ error: "No programs found" });
			}
			res.send(programs);
		})
		.catch((e) => res.status(404).json(e));
};

// @route	POST api/programs/
// @desc	Creates a new Program
// @access	Private
exports.postProgram = (req, res) => {
	// check for validation errors
	const { errors, is_valid } = validateProgramInput(req.body);
	6;
	// send 400 error with validation errors if not valid.
	if (!is_valid) return res.status(400).json(errors);

	var body = _.pick(req.body, ["name"]);

	new Program(body)
		.save()
		.then((program) => {
			// check if it didn't save
			if (!program) {
				errors.program = "Unable to create the new program";
				return res.status(400).json(errors);
			}

			// create notification
			sendNote(
				`A program has been created: ${program.name}`,
				req.headers.authorization
			);

			// send the program
			res.send(program);
		})
		.catch((err) => console.log(err));
};

// @route	GET api/Programs/:id
// @desc	Retrieves a specific Program
// @access	Private
exports.getProgram = (req, res) => {
	let errors = {};

	if (!ObjectId.isValid(req.params.id)) {
		errors.program = "There was no program found";
		return res.status(400).json(errors);
	}

	Program.findById(req.params.id)
		.then((program) => {
			if (!program) {
				return res.json({ error: "No program was found" });
			}
			res.send(program);
		})
		.catch((e) => res.status(404).json(e));
};

// @route   DELETE api/program/:id
// @desc    Deletes a specific Program
// @access  Private
exports.deleteProgram = (req, res) => {
	let errors = {};

	if (!ObjectId.isValid(req.params.id)) {
		errors.program = "There was no program found";
		return res.status(400).json(errors);
	}

	Program.findByIdAndRemove(req.params.id)
		.then((program) => {
			if (!program) {
				errors.program = "Unable to find and remove the program.";
				res.status(404).json(errors);
			}

			// create notification
			sendNote(
				`A program has been deleted: ${program.name}`,
				req.headers.authorization
			);

			res.json(program);
		})
		.catch((e) => res.status(400).send(e));
};

// @route   PATCH api/Programs/:id
// @desc    Updates a Program
// @access  Private
exports.patchProgram = (req, res) => {
	// check for validation errors
	var { errors, is_valid } = validateProgramInput(req.body);

	// send 400 error with validation errors if not valid.
	if (!is_valid) return res.status(400).json(errors);

	if (!ObjectId.isValid(req.params.id)) {
		errors.program = "There was no program found";
		return res.status(400).json(errors);
	}

	var update = _.pick(req.body, ["name"]);

	Program.findByIdAndUpdate(req.params.id, update, { new: true })
		.then((program) => {
			if (!program) {
				return res.json({ error: "No program was found." });
			}
			// create notification
			sendNote(
				`A program has been updated: ${program.name}`,
				req.headers.authorization
			);

			res.send(program);
		})
		.catch((e) => res.status(404).json(e));
};
