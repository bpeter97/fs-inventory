import mongoose from "mongoose";
const Schema = mongoose.Schema;
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

// Define the User model.
const UserSchema = new Schema({
	username: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	first_name: {
		type: String,
		required: true,
	},
	last_name: {
		type: String,
		required: true,
	},
	suffix: {
		type: String,
	},
	email: {
		type: String,
		minlength: 5,
		required: true,
	},
	approved: {
		type: Boolean,
		required: true,
		default: false,
	},
	type: {
		type: String,
		required: true,
		default: "Employee",
	},
	date_created: {
		type: Date,
		required: true,
	},
});

UserSchema.statics.findByToken = function (token) {
	var User = this;
	var decoded;

	try {
		decoded = jwt.verify(token, process.env.secretKey);
	} catch (e) {
		return Promise.reject();
	}

	return User.findById(decoded._id);
};

UserSchema.methods.generateAuthToken = function () {
	var user = this;
	var access = "auth";
	var token = jwt
		.sign(
			{
				_id: user._id,
				username: user.username,
				first_name: user.first_name,
				last_name: user.last_name,
				suffix: user.suffix,
				email: user.email,
				type: user.type,
				approved: user.approved,
			},
			process.env.secretKey
		)
		.toString();

	return token;
};

UserSchema.pre("save", function (next) {
	var user = this;

	if (user.isModified("password")) {
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, (err, hash) => {
				user.password = hash;
				next();
			});
		});
	} else {
		next();
	}
});

// Export the User model.
module.exports = User = mongoose.model("user", UserSchema);
