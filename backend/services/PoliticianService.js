const express = require('express');

let Deputy = require('../models/DeputyModel');
let Senator = require('../models/SenatorModel');

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
    const name = req.query.name;
    try {
      console.log(req.query);
      const deputies = await Deputy.find({ name : new RegExp(name, "i") }).lean().exec();
      const senators = await Senator.find({ name : new RegExp(name, "i") }).lean().exec();
      res.json([...deputies, ...senators]);
    } catch (err) {
      res.status(400).json({ message: 'Error when retrieving politicians by name' })
    }
  }
}

module.exports = PoliticianService;