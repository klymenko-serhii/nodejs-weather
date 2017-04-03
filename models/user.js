'use strict';

const UserSchema = require('./schemas/user.js');

module.exports = {
  createUser,
  getUser,
  addCity,
  removeCity
};

function createUser(username, password) {
  return UserSchema.create({ username, password });
}

function getUser(username) {
  return UserSchema.findOne({username});
}

function addCity(username, city) {
  return UserSchema.findOneAndUpdate(
    { username },
    {
      $addToSet: { cities: city }
    }
  );
}

function removeCity(username, city) {
  return UserSchema.findOneAndUpdate(
    { username },
    {
      $pull: { cities: city }
    }
  );
}