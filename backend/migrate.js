const Deputy = require('./models/DeputyModel');
const Senator = require('./models/SenatorModel');
const User = require('./models/UserModel');
const generator = require('generate-password');


(async () => {
    await User.deleteMany({});
    await Deputy.deleteMany({});
    await Senator.deleteMany({});

    Senator.collection.insertMany(require('../scarping/people_info/dump/senators'));

    Deputy.collection.insertMany(require('../scarping/people_info/dump/deputies'));

    const testUser = await Deputy.collection.insertOne({ "name": "Deputat Test", "party": "PNL", "email": "raulgherasim@gmail.com", "address": "Alba Iulia, Str. Basarabiei nr. 3, jud. Alba", "pictureUrl": "https://balance-global.com/wp-content/uploads/2015/10/test-user-avatar.png", "politicianType": "deputy", "county": "alba" });

    [... await Deputy.find({}).lean().exec(), ... await Senator.find({}).lean().exec()]
        .filter(politician => politician.email)
        .forEach((politician) => {
            User.register({ username: politician.name, email: politician.email, token: '123', politicianId: politician._id }, politician.email === 'raulgherasim@gmail.com' ? '123' : generator.generate({ length: 10, numbers: true }))
        });
})()
