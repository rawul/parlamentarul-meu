const express = require('express');
const deputyRoutes = express.Router();

let Deputy = require('../models/DeputyModel');
let Senator = require('../models/SenatorModel');

const PoliticianService = {
  getPoliticians: async (req, res) => {
    const county = req.params.county;
    try {
      const deputies = await Deputy.find({ county }).lean().exec();
      const senators = await Senator.find({ county }).lean().exec();
      res.send([
        ...deputies.map((deputy) => ({ ...deputy, ...{ politicianType: 'deputy' } })),
        ...senators.map((senator) => ({ ...senator, ...{ politicianType: 'senator' } }))
      ]);
    } catch (err) {
      res.status(400).json({ message: 'There has been an error' })
    }
    console.log({ county })
  },
}

module.exports = PoliticianService;