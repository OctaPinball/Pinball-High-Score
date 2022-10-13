/**
 * Ha nincs POST adat next()-et hív. Egyébként beszúr egy új gépet az adatbázisba, majd next()-et hív.
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        next();
    };
};