const { ObjectID } = require("mongodb");

var seedRequirements = [
    {
        _id: new ObjectID(),
        is_boolean: false,
        is_number: false,
        label: "Section Requirement",
        value_boolean: null,
        value_character: "Character value",
        value_int: null
    }
  ];
  
  module.exports = {
    seedRequirements,
  };
  
