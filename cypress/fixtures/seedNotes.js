const { ObjectID } = require("mongodb");

var noteOneId = new ObjectID();
var noteTwoId = new ObjectID();

var seedNotes = [
    {
        _id: noteOneId,
        note: "Section Note",
    },
    {
        _id: noteTwoId,
        note: "Sub Section Note"
    }
  ];
  
  module.exports = {
    seedNotes,
  };
  
