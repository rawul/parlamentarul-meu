const express = require('express');

let Deputy = require('../models/DeputyModel');
let Senator = require('../models/SenatorModel');

const PoliticianService = {
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
}

module.exports = PoliticianService;