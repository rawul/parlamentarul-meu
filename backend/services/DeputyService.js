const express = require('express');
const deputyRoutes = express.Router();

let Deputy = require('../models/DeputyModel');

deputyRoutes.route('/deputy').post(function (req, res) {
  let deputy = new Deputy(req.body);
  deputy.save()
    .then(deputy => {
      res.status(200).json({'deputy': 'deputy in added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

deputyRoutes.route('/deputies').get(function (req, res) {
    Deputy.find(function(err, deputies){
    if(err){
      console.log(err);
    }
    else {
      res.json(deputies);
    }
  });
});

module.exports = deputyRoutes;