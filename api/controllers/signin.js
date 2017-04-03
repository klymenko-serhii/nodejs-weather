'use strict';

const util = require('util');
const request = require('request');

/** jwt helper */
const jwt = require('../helpers/jwt.js');

const UserModel = require('../../models/user.js');

module.exports = {
  signin
}

function signin(req, res, next) {
  const { username, password } = req.swagger.params.user.value;
  UserModel.getUser(username)
    .then(user => {
      if (!user || user.password !== password) {
         res.status(400).json({message: 'Bad credentials.'});
      } else {
        let token = "";
        try {
          token = jwt.generateToken(username);
        } catch(e) {
          return next(e);
        }
        res.json({
          success: true,
          token: token
        });
      }
    }).catch(next);
}
