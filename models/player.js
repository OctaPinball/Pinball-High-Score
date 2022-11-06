const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Player = db.model('Player', {
  name: String,
  username: String,
  password: String,
  birthdate: Date,
  ifpa_id: Number,
  admin_role: Boolean,
});

module.exports = Player;