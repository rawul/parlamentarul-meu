const Deputy = require('./models/DeputyModel');
const Senator = require('./models/SenatorModel');

Deputy.collection.drop();
Senator.collection.drop();

Deputy.collection.insertMany(require('../scarping/people_info/dump/deputies'));
Senator.collection.insertMany(require('../scarping/people_info/dump/senators'));