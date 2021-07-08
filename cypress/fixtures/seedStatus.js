const { ObjectID } = require("mongodb");

var seedStatus = [
    {
        _id: new ObjectID(),
        label: "Inspected",
        initials: "IN"
    },
    {
        _id: new ObjectID(),
        label: "Note Inspected",
        initials: "NI"
    },
    {
        _id: new ObjectID(),
        label: "Repair or Replace",
        initials: "RR"
    },
    {
        _id: new ObjectID(),
        label: "Not Present",
        initials: "NP"
    }
  ];
  
  module.exports = {
    seedStatus,
  };
  
