const Deputy = require('./models/DeputyModel');
const Senator = require('./models/SenatorModel');
const User = require('./models/UserModel');
const generator = require('generate-password');

User.collection.drop();
Deputy.collection.drop();
Senator.collection.drop();

(async () => {

    await Senator.collection.insertMany(require('../scarping/people_info/dump/senators'));

    await Deputy.collection.insertMany(require('../scarping/people_info/dump/deputies'));
    const testUser = await Deputy.collection.insertOne({ "name": "Emilut", "party": "PNL", "email": "raulgherasim@gmail.com", "address": "Alba Iulia, Str. Basarabiei nr. 3, jud. Alba", "pictureUrl": "http://www.landia.ro/wp-content/uploads/2018/01/emilut.jpg", "politicianType": "deputy", "county": "alba" })
    User.register({ username: 'test', email: 'raulgherasim@gmail.com', token: '123', politicianId: testUser.insertedId }, '123');


    [... await Deputy.find({}).lean().exec(), ... await Senator.find({}).lean().exec()]
        .filter(politician => politician.email)
        .forEach((politician) => {
            User.register({ username: politician.name, email: politician.email, token: '123', politicianId: politician._id }, generator.generate({ length: 10, numbers: true }))
        });
    console.log()
})()
