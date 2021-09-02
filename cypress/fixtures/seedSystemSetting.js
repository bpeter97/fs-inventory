const ObjectID = require('mongoose').Types.ObjectId;

var seedSystemSettings = [
    {
        _id: new ObjectID(),
        base_inspection_charge: 250.00,
        distance_modifier: 2.00,
        age_modifier: 1.80,
        square_footage_modifier: 0.04,
        pool_spa_charge: 75.00,
        deck_charge: 65.00,
        crawlspace_charge: 95.00
    }
  ];
  
  module.exports = {
    seedSystemSettings,
  };
  
