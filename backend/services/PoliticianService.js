const express = require('express');
const deputyRoutes = express.Router();

let Deputy = require('../models/DeputyModel');
let Senator = require('../models/SenatorModel');

const PoliticianService = {
  getPoliticians: async (req, res) => {
    const county = req.params.county;
    try {
      const deputies = await Deputy.find({ county }).exec();
      const senators = await Senator.find({ county }).exec();
      res.send([...deputies, ...senators]);
    } catch (err) {
      res.status(400).json({ message: 'There has been an error' })
    }
    console.log({ county })
  },
}

module.exports = PoliticianService;