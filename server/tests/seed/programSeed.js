const { ObjectId } = require("mongodb");
const Program = require("../../models/Program");

const programOneID = new ObjectId();
const programTwoID = new ObjectId();
const programThreeID = new ObjectId();

var programs = [
	{
		_id: programOneID,
		name: "Program 1",
	},
	{
		_id: programTwoID,
		name: "Program 2",
	},
	{
		_id: programThreeID,
		name: "Program 3",
	},
];

const populatePrograms = (done) => {
	Program.deleteMany({})
		.then(() => {
			// generate the hash/salted password for the users.
			var programOne = new Program(programs[0]).save().catch((e) => {
				console.log(e);
			});
			var programTwo = new Program(programs[1]).save().catch((e) => {
				console.log(e);
			});
			var programThree = new Program(programs[2]).save().catch((e) => {
				console.log(e);
			});

			return Promise.all([programOne, programTwo, programThree]);
		})
		.then(() => done())
		.catch((e) => console.log(e));
};

module.exports = {
	populatePrograms,
	programs,
};
