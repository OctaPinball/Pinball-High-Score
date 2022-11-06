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