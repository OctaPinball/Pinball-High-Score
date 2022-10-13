/**
 * Ha a kijelölt flipperre még nincs pontszám beírva, akkor felveszi az adatbázisba a beírt pontszámot majd next()-et hív.
 * Ellenkező esetben next()-et hív hibaüzenettel.
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        next();
    };
};