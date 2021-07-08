const { ObjectID } = require("mongodb");

var seedSections = [
    {
        _id: new ObjectID(),
        label: "SubSection Label",
        sub_sections: [],
        notes: [],
        requirements: []
    }
  ];
  
  module.exports = {
    seedSections,
  };
  
