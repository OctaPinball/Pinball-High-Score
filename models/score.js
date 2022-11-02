const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Score = db.model('Score', {
  score: Number,
  _machine: {
    type: Schema.Types.ObjectId,
    ref: 'Machine'
  },
  _player: {
    type: Schema.Types.ObjectId,
    ref: 'Player'
  }
});

module.exports = Score;