const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Player = db.model('Player', {
  name: String,
  username: String,
  password: String,
  birthdate: String, //korrigálni kell
  ifpa_id: Number,
});

module.exports = Player;