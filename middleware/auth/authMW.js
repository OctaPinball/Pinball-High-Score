/**
 * Ha valamilyen felhasználó be van jelentkezve beállítja a megfelelő "role"-t és hív egy next()-et,
 * ellenkező esetben átirányít a /-re
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        next();
    };
};