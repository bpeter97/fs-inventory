const ObjectID = require('mongoose').Types.ObjectId;

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
  
