/**
 * A bejelentkeztetésért felelős MW
 * 
 *   if(nincs POST adat)
 *       next()
 *   if(login gombot nyomták meg)
 *       2 form field: username, password
 *       adatbázisban megkeresi a bejövő username password kombinációt
 *       if(sikeres)
 *           sessionbe eltárol
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