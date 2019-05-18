const Deputy = require('./models/DeputyModel');
const Senator = require('./models/SenatorModel');
const User = require('./models/UserModel');

User.collection.drop();
Deputy.collection.drop();
Senator.collection.drop();

User.register({ username: 'test', email: 'test@test.test', token: '123' }, '123')

Deputy.collection.insertMany(require('../scarping/people_info/dump/deputies'));
Senator.collection.insertMany(require('../scarping/people_info/dump/senators'));