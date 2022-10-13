/**
 *  A regisztrációért felelős MW
 * 
 *   if(nincs POST adat)
 *       next()
 *   if(register gombot nyomták meg)
 *       if(sikeres)
 *           játékos regisztrálása formbeli értékek alapján
 *           átirányít /competition - re
 *       else
 *           next() hibaüzenettel
 *   else
 *       next()  
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        next();
    };
};