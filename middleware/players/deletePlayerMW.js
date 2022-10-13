/**
 * Ha a player_id létezik az adatbázisban, akkor törli és átirányít a /players-re
 * Ellenkező esetben next()-et hív hibaüzenettel
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        next();
    };
};