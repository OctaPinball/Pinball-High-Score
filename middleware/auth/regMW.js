/**
 *  A regisztrációért felelős MW
 * 
 *   if(nincs POST adat)
 *       next()
 *   if(register gombot nyomták meg)
 *       if(sikeres)
 *           játékos regisztrálása formbeli értékek alapján
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
    
        //not enough parameter
        if ((typeof req.body === 'undefined') || (typeof req.body.username === 'undefined') ||
        (typeof req.body.password === 'undefined') || (typeof req.body.name === 'undefined') || 
        (typeof req.body.ifpaid === 'undefined') || (typeof req.body.birthdate === 'undefined') ) {
        return next();
    }

    //lets find the user
    UserModel.findOne({
        username: req.body.username
    }, function (err, result) {

        if ((err) || (result !== null)) {
        res.tpl.error.push('Your username is already registered!');
        return next();
        }

        if (req.body.username.length < 6) {
        res.tpl.error.push('The username should be at least 6 characters!');
        return next();
        }

        //create user
        var newUser = new UserModel();
        newUser.name = req.body.name;
        newUser.username = req.body.username;
        newUser.password = req.body.password;
        newUser.ifpaid = req.body.ifpaid;
        newUser.birthdate = req.body.birthdate;
        newUser.save(function (err) {
        //redirect to /competition
        return res.redirect('/competition');
        });
    });
        next();
    };
};