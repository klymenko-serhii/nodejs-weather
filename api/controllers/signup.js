'use strict';

const util = require('util');
const request = require('request');

const UserModel = require('../../models/user.js');

module.exports = {
  createUser
}

function createUser(req, res, next) {
  const { username, password } = req.swagger.params.user.value;
  UserModel.getUser(username)
    .then(user => {
      if (user) {
        res.status(400).json({message: 'User with same `username` already exist'});
      } else {
        UserModel.createUser(username, password)
          .then(user => {
            res.json({
              success: true,
              user: {
                _id: user._id.toString(),
                username: user.username
              }
            });
          }).catch(next);
      }
    }).catch(next);
}
