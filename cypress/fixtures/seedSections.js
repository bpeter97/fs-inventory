const ObjectID = require('mongoose').Types.ObjectId;

var seedSections = [
    {
        _id: new ObjectID(),
        label: "Section Label",
        sub_sections: [],
        notes: [],
        requirements: []
    }
  ];
  
  module.exports = {
    seedSections,
  };
  
