require("dotenv").config();
const mongoose = require("mongoose");

const User = require("../../src/server/models/User");
const Settings = require("../../src/server/models/Settings");
const Note = require("../../src/server/models/Note");
const Status = require("../../src/server/models/Status");
var { seedUsers } = require("../fixtures/seedUsers");
var seedSettings = require("../fixtures/seedSettings.json");
var { seedNotes } = require("../fixtures/seedNotes");
var { seedStatus } = require("../fixtures/seedStatus");

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

        Note.deleteMany({}).then(() => {
          Note.insertMany(seedNotes, (err, notes) => {
            if(!notes)
              return console.error("There was an issue saving the notes documents.");

            console.log("The notes have been saved.");

            Status.deleteMany({}).then(() => {
              Status.insertMany(seedStatus, (err, statuses) => {
                if(!statuses)
                  return console.error("There was an issue saving the status'");

                console.log("The status' have been saved.");
                console.log("Exiting DB Reset Script");
                process.exit();
              });
            });
          });
        });
      });
    });
  });
});

module.exports = {
  seedUsers,
};
