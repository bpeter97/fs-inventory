import * as jwt_decode from "jwt-decode";
import { ObjectId } from "mongodb";

const isSelfOrAdmin = (req, res, next) => {
	let errors = {
		auth: "Admin access is required",
	};
	let token = req.header("authorization");

	const user = jwt_decode(token);

	if (req.params.id) {
		if (!ObjectId.isValid(req.params.id)) {
			errors.auth = "Invalid ID";
			return res.status(400).json(errors);
		} else {
			if (req.params.id == user._id) {
				next();
			} else if (user.type == "Admin") {
				next();
			} else {
				return res.status(401).json(errors);
			}
		}
	} else {
		errors.auth = "Invalid ID";
		return res.status(400).json(errors);
	}
};

module.exports = isSelfOrAdmin;
