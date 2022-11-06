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
    
    var PlayerModel = requireOption(objectrepository, 'PlayerModel');

    return function (req, res, next) {
    //not enough input
    if ((typeof req.body === 'undefined') || (typeof req.body.username === 'undefined') ||
      (typeof req.body.password === 'undefined')){
      return next();
    }

    //get user
    PlayerModel.findOne({
        username: req.body.username
    }, function (err, result) {
      if ((err) || (!result)) {
        res.tpl.error.push('This username does not exist!');
        return next();
      }

      //check password
      if (result.password !== req.body.password) {
        res.tpl.error.push('Wrong password!');
        return next();
      }

      //login is ok, save id to session
      if(result.admin_role == true)
        req.session.adminid = result._id;
      else
        req.session.userid = result._id;

      //redirect
      return res.redirect('/competition');
    });
    };
};