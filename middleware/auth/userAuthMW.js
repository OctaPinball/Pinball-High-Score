/**
 * Ellenőrzi ha user be van jelentkezve (admin nem lehet!), ha igen hív egy next()-et, ellenkező esetben átirányít a /-re 
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        if (typeof req.session.userid === 'undefined') {
            console.log('nem definiált session!!!')
            return res.redirect('/');
          }
          else
          {
            res.locals.userid = req.session.userid;
          }
        return next();
    };
};