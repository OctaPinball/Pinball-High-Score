/**
 *  Egy adott gép módosításáért felelős MW.
 * 
 *   if(nincs POST adat)
 *       next()
 *   else if(form nem valid)
 *       next() hibaüzenettel
 *   else if(machine nem létezik)
 *       next() hibaüzenettel
 *   else
 *       machine frissítése adatbázisban
 *       átirányít /machines - ra
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        next();
    };
};