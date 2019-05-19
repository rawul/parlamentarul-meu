const express = require('express');
const removeAccents = require('remove-accents');

let Deputy = require('../models/DeputyModel');
let Senator = require('../models/SenatorModel');
let User = require('../models/UserModel');
let Chat = require('../models/ChatModel');

const PoliticianService = {
  getPoliticianByUser: async (user) => {
    const deputy = await Deputy.findById(user.politicianId).lean().exec();
    const senator = await Senator.findById(user.politicianId).lean().exec();
    return deputy || senator;
  },
  getPoliticians: async (req, res) => {
    const page = parseInt(req.query.page);
    const deputiesSize = parseInt(req.query.size) / 2;
    const senatorsSize = parseInt(req.query.size) - deputiesSize;
    try {
      
      const deputies = await Deputy.find({}).skip(page*deputiesSize).limit(deputiesSize).lean().exec();
      const senators = await Senator.find({}).skip(page*senatorsSize).limit(senatorsSize).lean().exec();
      res.json([...deputies, ...senators]);
    } catch (err) {
      res.status(400).json({ message: 'There has been an error' })
    }
  },
  getPoliticiansByCounty: async (req, res) => {
    const county = req.params.county;
    const page = parseInt(req.query.page);
    const deputiesSize = parseInt(req.query.size) / 2;
    const senatorsSize = parseInt(req.query.size) - deputiesSize;
    try {
      const deputies = await Deputy.find({ county }).skip(page*deputiesSize).limit(deputiesSize).lean().exec();
      const senators = await Senator.find({ county }).skip(page*senatorsSize).limit(senatorsSize).lean().exec();
      res.json([...deputies, ...senators]);
    } catch (err) {
      res.status(400).json({ message: 'There has been an error' })
    }
  },
  getPoliticiansByName: async (req, res) => {
    const name = removeAccents(req.query.name);
    const page = parseInt(req.query.page);
    const deputiesSize = parseInt(req.query.size) / 2;
    const senatorsSize = parseInt(req.query.size) - deputiesSize;
    console.log(name);
    try {
      const deputies = await Deputy.find({ normalizedName : new RegExp('^' + name, "ig")}).skip(page*deputiesSize).limit(deputiesSize).lean().exec();
      const senators = await Senator.find({ normalizedName : new RegExp('^' + name, "ig")}).skip(page*senatorsSize).limit(senatorsSize).lean().exec();
      res.json([...deputies, ...senators])
    } catch (err) {
      res.status(400).json({ message: 'Error when retrieving politicians by name' })
    }
  },
  getActivePoliticians: async (req, res) => {
    function compare( a, b ) {
      return a.rate>b.rate? -1 : 1;
    }
    try {
      const users = await User.find().lean().exec();
      console.log({users});
      var activeRate = [];
      for (var i = 0; i < users.length; i++) {
          var chats = await Chat.find({ politicianMail: users[i].email }).lean().exec();
          console.log({ chats });
          activeRate.push({mail: users[i].email, rate: chats.length});
          console.log({activeRate});
      }
      activeRate.sort(compare);
      console.log(activeRate.slice(0, 10));
      res.json(activeRate.slice(0, 10));
    } catch (err) {
      res.status(400).json({ message: 'There has been an error' })
    }
  }
}

module.exports = PoliticianService;

