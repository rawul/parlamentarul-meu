const express = require('express');
const removeAccents = require('remove-accents');

let Deputy = require('../models/DeputyModel');
let Senator = require('../models/SenatorModel');

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
  }
}

module.exports = PoliticianService;

