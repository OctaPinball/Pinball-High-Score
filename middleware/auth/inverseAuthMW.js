/**
 * Ha nincs éppen bejelentkezett felhasználó next()-et hív, ellenkező esetben átirányít a /competition-re
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
            if (typeof req.session.userid !== 'undefined' || typeof req.session.adminid !== 'undefined') {
                return res.redirect('/competition');
            }
        return next();
    };
};