const express = require('express');
const removeAccents = require('remove-accents');

let Deputy = require('../models/DeputyModel');
let Senator = require('../models/SenatorModel');
let User = require('../models/UserModel')

const PoliticianService = {
  getPoliticianByUser: async (user) => {
    const deputy = await Deputy.findById(user.politicianId).lean().exec();
    const senator = await Senator.findById(user.politicianId).lean().exec();
    return deputy || senator;
  },
  getPoliticians: async (req, res) => {
    try {
      const deputies = await Deputy.find({}).lean().exec();
      const senators = await Senator.find({}).lean().exec();
      res.json([...deputies, ...senators]);
    } catch (err) {
      res.status(400).json({ message: 'There has been an error' })
    }
  },
  getPoliticiansByCounty: async (req, res) => {
    const county = req.params.county;
    try {
      const deputies = await Deputy.find({ county }).lean().exec();
      const senators = await Senator.find({ county }).lean().exec();
      res.json([...deputies, ...senators]);
    } catch (err) {
      res.status(400).json({ message: 'There has been an error' })
    }
  },
  getPoliticiansByName: async (req, res) => {
    const name = removeAccents(req.query.name);
    console.log(name);
    try {
      const deputies = await Deputy.find({ normalizedName : new RegExp('^' + name, "ig")}).lean().exec();
      const senators = await Senator.find({ normalizedName : new RegExp('^' + name, "ig")}).lean().exec();
      res.json([...deputies, ...senators])
    } catch (err) {
      res.status(400).json({ message: 'Error when retrieving politicians by name' })
    }
  },
  getActivePoliticians: async (req, res) => {
    try {
      const users = await User.find().lean().exec();
      const activeRate = [];
      for (var i = 0; i < users.length; i++) {
        try {
          const chats = await Chat.find({ politicianMail: users[i].email }).lean().exec();
          console.log({ chats });
          activeRate += [users[i].name, chats.length];
        } catch (err) {
          res.status(400).json({ message: "Message could not be retrieved" });
        }
      }
      activeRate.sort((a,b) => {
        if(a[1] > b[1])
          return a[1] > b[1] ? 1 : -1;
      });
      res.status(400).json(activeRate.slice(0, 10));
    } catch (err) {
      res.status(400).json({ message: 'There has been an error' })
    }
  }
}

module.exports = PoliticianService;

