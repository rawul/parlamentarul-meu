const Deputy = require('./models/DeputyModel');
const Senator = require('./models/SenatorModel');
const User = require('./models/UserModel');

User.collection.drop();
Deputy.collection.drop();
Senator.collection.drop();

(async () => {

    Senator.collection.insertMany(require('../scarping/people_info/dump/senators'));

    Deputy.collection.insertMany(require('../scarping/people_info/dump/deputies'));
    const testUser = await Deputy.collection.insertOne({ "name": "Emilut", "party": "PNL", "email": "raulgherasim@gmail.com", "address": "Alba Iulia, Str. Basarabiei nr. 3, jud. Alba", "pictureUrl": "http://www.landia.ro/wp-content/uploads/2018/01/emilut.jpg", "politicianType": "deputy", "county": "alba" })

    User.register({ username: 'test', email: 'raulgherasim@gmail.com', token: '123', politicianId: testUser.insertedId }, '123');
    console.log()
})()
