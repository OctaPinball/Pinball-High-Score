/**
 * Ha admin be van jelentkezve next()-et hív, ellenkező esetben átirányít a /-re
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        if (typeof req.session.adminid === 'undefined') {
            return res.redirect('/');
          }
          else
          {
            res.locals.adminid = req.session.adminid;
          }
        return next();
    };
};