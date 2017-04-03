'use strict';

const mongoose = require('mongoose');

module.exports = {
  connect
}

function connect() {
  return mongoose.connect('mongodb://weatherjs:weatherjs@ds145750.mlab.com:45750/weatherjs');
}