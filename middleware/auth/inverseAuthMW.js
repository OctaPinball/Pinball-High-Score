/**
 * Ha nincs éppen bejelentkezett felhasználó next()-et hív, ellenkező esetben átirányít a /-re
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        next();
    };
};