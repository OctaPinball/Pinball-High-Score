const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Machine = db.model('Machine', {
  name: String,
  manufacturer: String,
  year: Number,
});

module.exports = Machine;