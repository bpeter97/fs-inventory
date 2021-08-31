require("dotenv").config();
const mongoose = require("mongoose");

const User = require("../../src/server/models/User");
const Settings = require("../../src/server/models/Settings");
const Note = require("../../src/server/models/Note");
const Status = require("../../src/server/models/Status");
const SubSection = require("../../src/server/models/SubSection");
const Requirement = require("../../src/server/models/Requirement");
const Section = require("../../src/server/models/Section");
const Inspection = require("../../src/server/models/Inspection");
const Notification = require("../../src/server/models/Notification");
const SystemSetting = require("../../src/server/models/SystemSetting");
const Job = require("../../src/server/models/Job");
const Client = require("../../src/server/models/Client");
const Call = require("../../src/server/models/Call");
var { seedUsers } = require("../fixtures/seedUsers");
var seedSettings = require("../fixtures/seedSettings.json");
var { seedNotes } = require("../fixtures/seedNotes");
var { seedStatus } = require("../fixtures/seedStatus");
var { seedSubSections } = require("../fixtures/seedSubSections");
const { seedRequirements } = require("../fixtures/seedRequirements");
const { seedSections } = require("../fixtures/seedSections");
const { seedInspections } = require("../fixtures/seedInspections");
const { seedJobs } = require("../fixtures/seedJobs");
const { seedClients } = require("../fixtures/seedClients");
const { seedCalls } = require("../fixtures/seedCalls");
const calls = require("../../src/server/routes/validation/calls");
const { seedSystemSettings } = require("../fixtures/seedSystemSetting");

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

                  // Insert subsections
                  SubSection.insertMany(seedSubSections, (err, subSections) => {
                    if(!subSections) {
                      console.error("There was an issue saving the subsections.");
                      return process.exit();
                    }

                    console.log("The subsections have been saved.");

                    // delete and re-insert requirements
                    Requirement.deleteMany({}).then(() => {
                      Requirement.insertMany(seedRequirements, (err, requirements) => {
                        if(!requirements) {
                          console.error("There was an issue saving the requirements.");
                          return process.exit();
                        }  
                        console.log("The requirements have been saved.");
                        
                        // delete any sections
                        Section.deleteMany({}).then(() => {
                          
                          // prepare new section
                          seedSections[0].sub_sections.push(subSections[0]._id);
                          seedSections[0].notes.push(notes[1]._id);
                          seedSections[0].requirements.push(requirements[0]._id);

                          // Insert the section
                          Section.insertMany(seedSections, (err, sections) => {
                            if(!sections) {
                              console.error("There was an issue saving the sections.");
                              return process.exit();
                            }  
                            console.log("The sections have been saved.");

                            // Delete inspections
                            Inspection.deleteMany({}).then(() => {

                              // Prepare inspections
                              seedInspections[0].inspector = user._id;
                              seedInspections[0].sections.push(sections[0]._id);

                              // Insert inspections
                              Inspection.insertMany(seedInspections, (err, inspections) => {
                                if(!inspections) {
                                  console.error("There was an issue saving the inspections.");
                                  return process.exit();
                                }  
                                console.log("The inspections have been saved.");

                                // Delete and re-insert clients.
                                Client.deleteMany({}).then(() => {
                                  Client.insertMany(seedClients, (err, clients) => {
                                    if(!clients) {
                                      console.error("There was an issue saving the clients.");
                                      return process.exit();
                                    }  
                                    console.log("The clients have been saved.");

                                    // Delete jobs
                                    Job.deleteMany({}).then(() => {

                                      // Prepare jobs
                                      seedJobs[0].inspections.push(inspections[0]._id);
                                      seedJobs[0].client = clients[0]._id;

                                      // Insert Jobs
                                      Job.insertMany(seedJobs, (err, jobs) => {
                                        if(!jobs) {
                                          console.error("There was an issue saving the jobs.");
                                          return process.exit();
                                        }  
                                        console.log("The jobs have been saved.");

                                        Call.deleteMany({}).then(() => {

                                          Call.insertMany(seedCalls, (err, calls) => {
                                            if(!jobs) {
                                              console.error("There was an issue saving the jobs.");
                                              return process.exit();
                                            }  
                                            console.log("The calls have been saved.");
                                            Notification.deleteMany({}).then(() => {
                                              console.log("Notifications have been cleared.");

                                              SystemSetting.deleteMany({}).then(() => {

                                                SystemSetting.insertMany(seedSystemSettings, (err, systemSettings) => {

                                                  if(!systemSettings) {
                                                    console.error("There was an issue saving the system settings.");
                                                    return process.exit();
                                                  }
                                                  console.log("The system settings have been saved.");
                                                  console.log("Exiting DB Reset Script");
                                                  process.exit();
                                                });
                                              })
                                            })
                                          })
                                        })
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
