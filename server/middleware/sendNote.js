const User = require("./../models/User");

module.exports = function sendNote(note, userToken) {
	User.findByToken(userToken)
		.then((user) => {
			var newNote = new Notification().generateNote(note, user);

			newNote.save().catch((err) => console.log(err));
		})
		.catch((err) => console.log(err));
};
