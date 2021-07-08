const { ObjectID } = require("mongodb");

var seedInspections = [
    {
        _id: new ObjectID(),
        sections: [],
        type: "House",
        num_of_stories: 1,
        year_built: 2017,
        people_at_inspection: "Buyer(s) and Agent",
        inspector: null,
        date_of_inspection: Date()
    }
  ];
  
  module.exports = {
    seedInspections,
  };
  
