'use strict';

const util = require('util');
const request = require('request');

/** jwt helper */
const jwt = require('../helpers/jwt.js');

/** Yahoo weather api */
const yql = require('../helpers/yql.js');

const UserModel = require('../../models/user.js');

module.exports = {
  addCity,
  removeCity,
  getWeatherByCity
}

function addCity(req, res, next) {
  const city = req.swagger.params.city.value.toLowerCase();
  const username = req.jwt.username;
  UserModel.addCity(username, city)
    .then(r => {
      res.json({ 
        success: true
      });
    }).catch(next);
}

function removeCity(req, res, next) {
  const city = req.swagger.params.city.value;
  const username = req.jwt.username;
  UserModel.removeCity(username, city)
    .then(r => {
      res.json({ 
        success: true
      });
    }).catch(next);
}

function getWeatherByCity(req, res, next) {
  const username = req.jwt.username;
  UserModel.getUser(username)
    .then(user => {
      if (user.cities.length > 0) {
        yql.getCitiesWeather(user.cities)
          .then(results => {
            res.json({
              success: true,
              results
            });
          }).catch(next);
      } else {
        res.json({
          success: true,
          results: {}
        });
      }
    }).catch(next);
};