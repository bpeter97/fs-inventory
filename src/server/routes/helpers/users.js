const _ = require("lodash");
const bcrypt = require("bcryptjs");
const { ObjectID } = require("mongodb");

// Require Models
const User = require("../../models/User");
const Settings = require("../../models/Settings");

// validation files
const validateUserInput = require("../validation/users");
const validateLoginInput = require("../validation/login");

// @route   GET api/users/
// @desc    Retrieves all of the users
// @access  Private
exports.getUsers = (req, res) => {
  User.find({})
    .populate({ path: "settings", model: Settings })
    .then((users) => {
      if (!users) {
        return res.json({ error: "No users found." });
      }
      res.send(users);
    })
    .catch((e) => res.status(404).json(e));
};

// @route   GET api/users/:id
// @desc    Retrieves all of the users
// @access  Private
exports.getUser = (req, res) => {
  let errors = {};

  if (!ObjectID.isValid(req.params.id)) {
    errors.user = "There was no user found.";
    return res.status(400).json(errors);
  }

  User.findById(req.params.id)
    .populate({ path: "settings", model: Settings })
    .then((user) => {
      if (!user) {
        return res.json({ error: "No user was found." });
      }
      res.send(user);
    })
    .catch((e) => res.status(404).json(e));
};

// @route   PATCH api/users/:id
// @desc    Retrieves all of the users
// @access  Private
exports.patchUser = (req, res) => {
  // check for validation errors
  var { errors, is_valid } = validateUserInput(req.body);

  // send 400 error with validation errors if not valid.
  if (!is_valid) return res.status(400).json(errors);

  if (!ObjectID.isValid(req.params.id)) {
    error.user = "There was no user found.";
    return res.status(400).json(errors);
  }

  var update = _.pick(req.body, [
    "username",
    "password",
    "first_name",
    "last_name",
    "suffix",
    "position",
    "email",
    "type",
    "approval",
  ]);

  User.findByIdAndUpdate(req.params.id, update, { new: true })
    .populate({ path: "settings", model: Settings })
    .then((user) => {
      if (!user) {
        return res.json({ error: "No user was found." });
      }
      res.send(user);
    })
    .catch((e) => res.status(404).json(e));
};

// @route   DELETE api/users/:id
// @desc    Deletes a specific user
// @access  Private
exports.deleteUser = (req, res) => {
  let errors = {};

  if (!ObjectID.isValid(req.params.id)) {
    error.user = "There was no user found.";
    return res.status(400).json(errors);
  }

  User.findByIdAndRemove(req.params.id)
    .then((user) => {
      if (!user) {
        errors.user = "Unable to find and remove the user.";
        res.status(404).json(errors);
      }

      res.json(user);
    })
    .catch((e) => res.status(400).send(e));
};

// @route   POST api/user/activate
// @desc    Activates a new user.
// @access  Private
exports.activateUser = (req, res) => {
  var body = _.pick(req.body, [
    "_id",
  ]);

  User.findById(body._id).then(user => {
    if(!user) {
      return res.status(400).json({ user: "No user found"});
    } else {

      user.approved = true;
      user
        .save()
        .then(user => {
          res.send(user);
        });
    }
  })
}

// @route   POST api/register/
// @desc    Creates a new User.
// @access  Private
exports.postUser = (req, res) => {
  
  // check for validation errors
  const { errors, is_valid } = validateUserInput(req.body);

  // send 400 error with validation errors if not valid.
  if (!is_valid) return res.status(400).json(errors);

  // Set the properties for the new User
  var body = _.pick(req.body, [
    "username",
    "password",
    "first_name",
    "last_name",
    "suffix",
    "position",
    "email",
  ]);

  body.type = "Employee";
  if(req.headers.authorization) {
    body.approved = true;
  } else {
    body.approved = false;
  }
  body.date_created = new Date();

  // Check to see if username exists
  User.findOne({ username: body.username }).then((user) => {
    if (user) {
      errors.username = "Username already exists.";
      return res.status(400).json(errors);
    } else {

      // Create default users settings
      var settings = new Settings({ notification: false });

      // Save the new settings to the DB
      settings.save().then((settings) => {
        // Assign new ID to the body
        body.settings = settings._id;

        // Create the new user
        var newUser = new User(body);

        // Save the new user to the DB, remember, password is hashed and salted in save() method.
        newUser
          .save()
          .then((user) =>  res.send(user))
          .catch((err) => console.log(err));
        })
    }
  });
};

// @route   POST api/users/login
// @desc    Retrieves all of the users
// @access  Private
exports.loginUser = (req, res) => {
  // Check validation
  const { errors, is_valid } = validateLoginInput(req.body);

  // send 400 error with validation errors if not valid.
  if (!is_valid) return res.status(400).json(errors);

  // declare vars
  var body = _.pick(req.body, ["username", "password"]);

  // define universal login error
  const login_error = "Wrong username/password combination";

  //  find the user using provided details
  User.findOne({ username: body.username })
    .then((user) => {
      // if no user found, return login error
      if (!user) {
        errors.login = login_error;
        return res.status(401).json(errors);
      }

      // if user found, compare passwords
      bcrypt.compare(body.password, user.password).then((is_match) => {
        if (is_match) {
          if (user.approved == true) {
            let token = user.generateAuthToken();
            res.json({ success: true, token });
          } else {
            errors.login = "Your account is not approved yet.";
            res.status(401).json(errors);
          }
        } else {
          errors.login = login_error;
          return res.status(401).json(errors);
        }
      });
    })
    .catch((e) => res.status(400).json(e));
};