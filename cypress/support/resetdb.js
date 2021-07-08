require("dotenv").config();
const mongoose = require("mongoose");

const User = require("../../src/server/models/User");
const Settings = require("../../src/server/models/Settings");
var { seedUsers } = require("../fixtures/seedUsers.js");
var seedSettings = require("../fixtures/seedSettings.json");

// Grab the URI for the DB.
const db = process.env.DEV_DB_URI;

// Connect to the DB.
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("DB Connected"))
  .catch((err) => console.error("DB Error", err));

mongoose.set("useFindAndModify", false);

Settings.deleteMany({}).then(() => {
  settingsOne = new Settings(seedSettings[0]).save().then((setting) => {
    if (!setting)
      return console.error(
        "There was an issue saving the setting document in the database."
      );

    seedUsers[0].settings = setting._id;
    seedUsers[0].date_created = new Date();

    User.deleteMany({}).then(() => {
      userOne = new User(seedUsers[0]).save().then((user) => {
        if (!user)
          return console.error(
            "There was an issue saving the user document to the database."
          );

        console.log("The settings and user data have been reset for testing.");
        console.log("Exiting DB Reset Script");

        process.exit();
      });
    });
  });
});

module.exports = {
  seedUsers,
};
