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
  getTop10: async (req, res) => {
    try {
      const deputies = await Deputy.find({}).sort({ influence: -1 }).limit(10);
      const topCounties = (await Deputy.find({}).lean().exec())
        .reduce((counties, deputy) => {
          let county = counties.find(c => c.name === deputy.county);
          if (!deputy.activity || !deputy.influence || !deputy.county) {
            return counties;
          }
          if (county) {
            county.influence += deputy.influence;

            county.activity.luariDeCuvant.total += deputy.activity.luariDeCuvant.total || 0;
            county.activity.luariDeCuvant.sedinte += deputy.activity.luariDeCuvant.sedinte || 0;
            county.activity.declaratiiPolitice += deputy.activity.declaratiiPolitice || 0;
            county.activity.propuneriLegislative.total += deputy.activity.propuneriLegislative.total || 0;
            county.activity.propuneriLegislative.promulgate += deputy.activity.propuneriLegislative.promulgate || 0;
            county.activity.propuneriDeHotarare += deputy.activity.propuneriDeHotarare || 0;
            county.activity.intrebariSiInterpelari += deputy.activity.intrebariSiInterpelari || 0;

            county.influenceNumber++;
            return counties;
          }
          county = {
            name: deputy.county,
            influence: deputy.influence,
            influenceNumber: 1,
            activity: {
              luariDeCuvant: { total: 0, sedinte: 0 },
              declaratiiPolitice: 0,
              propuneriLegislative: { total: 0, promulgate: 0 },
              propuneriDeHotarare: 0,
              intrebariSiInterpelari: 0
            }
          }
          return counties.concat(county)
        }, [])
        .map(c => ({ ...c, ...{ influence: c.influence / c.influenceNumber } }))
        .sort((a, b) => b.influence - a.influence)
        .slice(0, 10);

      const topParties = (await Deputy.find({}).lean().exec())
        .reduce((parties, deputy) => {
          let party = parties.find(c => c.name === deputy.party);

          if (party) {
            party.influence += deputy.influence || 0;
            if (deputy.influence === null) {
              console.log({ party, deputy })
            }
            party.activity.luariDeCuvant.total += deputy.activity.luariDeCuvant.total || 0;
            party.activity.luariDeCuvant.sedinte += deputy.activity.luariDeCuvant.sedinte || 0;
            party.activity.declaratiiPolitice += deputy.activity.declaratiiPolitice || 0;
            party.activity.propuneriLegislative.total += deputy.activity.propuneriLegislative.total || 0;
            party.activity.propuneriLegislative.promulgate += deputy.activity.propuneriLegislative.promulgate || 0;
            party.activity.propuneriDeHotarare += deputy.activity.propuneriDeHotarare || 0;
            party.activity.intrebariSiInterpelari += deputy.activity.intrebariSiInterpelari || 0;

            return parties;
          }
          party = {
            name: deputy.party,
            influence: deputy.influence || 0,
            activity: {
              luariDeCuvant: { total: 0, sedinte: 0 },
              declaratiiPolitice: 0,
              propuneriLegislative: { total: 0, promulgate: 0 },
              propuneriDeHotarare: 0,
              intrebariSiInterpelari: 0
            }
          }
          return parties.concat(party)
        }, [])
        .sort((a, b) => b.influence - a.influence)
        .slice(0, 10);

      res.json({ deputies, topCounties, topParties })
    } catch (err) {
      console.log({ err })
      res.status(400).json({ message: 'error', err });
    }
  },
  getPoliticians: async (req, res) => {
    const page = parseInt(req.query.page);
    const deputiesSize = parseInt(req.query.size) / 2;
    const senatorsSize = parseInt(req.query.size) - deputiesSize;
    try {

      const deputies = await Deputy.find({}).skip(page * deputiesSize).limit(deputiesSize).lean().exec();
      const senators = await Senator.find({}).skip(page * senatorsSize).limit(senatorsSize).lean().exec();
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
      const deputies = await Deputy.find({ county }).skip(page * deputiesSize).limit(deputiesSize).lean().exec();
      const senators = await Senator.find({ county }).skip(page * senatorsSize).limit(senatorsSize).lean().exec();
      res.json([...deputies, ...senators]);
    } catch (err) {
      res.status(400).json({ message: 'There has been an error' })
    }
  },
  getPoliticiansByName: async (req, res) => {
    const name = req.query.name;
    const page = parseInt(req.query.page);
    const deputiesSize = parseInt(req.query.size) / 2;
    const senatorsSize = parseInt(req.query.size) - deputiesSize;
    console.log(name);
    try {
      const deputies = await Deputy.find({ normalizedName: new RegExp('^' + name, "ig") }).skip(page * deputiesSize).limit(deputiesSize).lean().exec();
      const senators = await Senator.find({ normalizedName: new RegExp('^' + name, "ig") }).skip(page * senatorsSize).limit(senatorsSize).lean().exec();
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
      activeRate.sort((a, b) => {
        if (a[1] > b[1])
          return a[1] > b[1] ? 1 : -1;
      });
      res.status(400).json(activeRate.slice(0, 10));
    } catch (err) {
      res.status(400).json({ message: 'There has been an error' })
    }
  }
}

module.exports = PoliticianService;

