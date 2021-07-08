require("dotenv").config();
const mongoose = require("mongoose");

const User = require("../../src/server/models/User");
const Settings = require("../../src/server/models/Settings");
const Note = require("../../src/server/models/Note");
const Status = require("../../src/server/models/Status");
const SubSection = require("../../src/server/models/SubSection");
var { seedUsers } = require("../fixtures/seedUsers");
var seedSettings = require("../fixtures/seedSettings.json");
var { seedNotes } = require("../fixtures/seedNotes");
var { seedStatus } = require("../fixtures/seedStatus");
var { seedSubSections } = require("../fixtures/seedSubSections");

// Grab the URI for the DB.
const db = process.env.DEV_DB_URI;

// Connect to the DB.
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("DB Connected"))
  .catch((err) => console.error("DB Error", err));

mongoose.set("useFindAndModify", false);

// Delete settings, re-insert new settings.
Settings.deleteMany({}).then(() => {
  settingsOne = new Settings(seedSettings[0]).save().then((setting) => {
    if (!setting)
      return console.error(
        "There was an issue saving the setting document in the database."
      );

    // Assign settings ID to the seedUsers data.
    seedUsers[0].settings = setting._id;
    seedUsers[0].date_created = new Date();

    // Delete users, re-insert new user.
    User.deleteMany({}).then(() => {
      userOne = new User(seedUsers[0]).save().then((user) => {
        if (!user) {
          console.error("There was an issue saving the user document to the database.");
          return process.exit();
        }

        console.log("The settings and user data have been reset for testing.");

        // Delete notes, re-insert new notes
        Note.deleteMany({}).then(() => {
          Note.insertMany(seedNotes, (err, notes) => {
            if(!notes) {
              console.error("There was an issue saving the notes documents.");
              return process.exit();
            }

            console.log("The notes have been saved.");

            // Delete status, re-insert status
            Status.deleteMany({}).then(() => {
              Status.insertMany(seedStatus, (err, statuses) => {
                if(!statuses) {
                  console.error("There was an issue saving the status.");
                  return process.exit();
                }

                  console.log("The status' have been saved.");

                // Images would go here

                // Delete sub-sections, re-insert sub-sections.
                SubSection.deleteMany({}).then(() => {

                  // Preparing seedSubSections
                  seedSubSections[0].notes.push(notes[1]._id);
                  seedSubSections[0].status = statuses[0]._id;

                  SubSection.insertMany(seedSubSections, (err, subSections) => {
                    if(!subSections) {
                      console.error("There was an issue saving the subsections.");
                      return process.exit();
                    }

                    console.log("The subsections have been saved.");
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
  });
});

module.exports = {
  seedUsers,
};
