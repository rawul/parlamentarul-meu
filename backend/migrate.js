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

    const testUser = await Deputy.collection.insertOne({ "name": "Emilut", "party": "PNL", "email": "raulgherasim@gmail.com", "address": "Alba Iulia, Str. Basarabiei nr. 3, jud. Alba", "pictureUrl": "http://www.landia.ro/wp-content/uploads/2018/01/emilut.jpg", "politicianType": "deputy", "county": "alba" });

    [... await Deputy.find({}).lean().exec(), ... await Senator.find({}).lean().exec()]
        .filter(politician => politician.email)
        .forEach((politician) => {
            User.register({ username: politician.name, email: politician.email, token: '123', politicianId: politician._id }, politician.name === 'Emilut' ? '123' : generator.generate({ length: 10, numbers: true }))
        });
})()
