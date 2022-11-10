const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        if (typeof req.session.userid !== 'undefined' || typeof req.session.adminid !== 'undefined') {
            res.locals.userid = req.session.userid;
            res.locals.adminid = req.session.adminid;
          }

          if(typeof req.session.errortext !== 'undefined')
          {
            res.locals.error = req.session.errortext;
            req.session.errortext = undefined;
            req.session.save();
          }
        return next();
    };
};