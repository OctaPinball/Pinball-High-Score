/**
 * Ellenőrzi ha user be van jelentkezve (admin nem lehet!), ha igen hív egy next()-et, ellenkező esetben átirányít a /-re 
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        if (typeof req.session.userid === 'undefined') {
            return res.redirect('/');
          }
        return next();
    };
};