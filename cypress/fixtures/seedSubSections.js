const { ObjectID } = require("mongodb");

var seedSubSections = [
    {
        _id: new ObjectID(),
        label: "SubSection Label",
        status: null,
        notes: [],
        images: []
    }
  ];
  
  module.exports = {
    seedSubSections,
  };
  
