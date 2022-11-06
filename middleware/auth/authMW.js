/**
 * Ha valamilyen felhasználó be van jelentkezve beállítja a megfelelő "role"-t és hív egy next()-et,
 * ellenkező esetben átirányít a /-re
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        if (typeof req.session.userid === 'undefined' && typeof req.session.adminid === 'undefined') {
            return res.redirect('/');
          }
          else
          {
            res.locals.userid = req.session.userid;
            res.locals.adminid = req.session.adminid;
          }
        return next();
    };
};