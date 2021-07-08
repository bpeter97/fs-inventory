const { ObjectID } = require("mongodb");

var seedSubSections = [
    {
        _id: new ObjectID(),
        status: [],
        notes: [],
        images: []
    }
  ];
  
  module.exports = {
    seedSubSections,
  };
  
