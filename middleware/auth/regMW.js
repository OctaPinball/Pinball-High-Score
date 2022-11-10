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
        if ((typeof req.body === 'undefined') || (typeof req.body.reg_username === 'undefined') ||
        (typeof req.body.reg_password === 'undefined') || (typeof req.body.reg_name === 'undefined') || 
        (typeof req.body.reg_ifpaid === 'undefined') || (typeof req.body.reg_birthdate === 'undefined') ) {
        return next();
    }

    //lets find the user
    PlayerModel.findOne({
        username: req.body.reg_username
    }, function (err, result) {

        if ((err) || (result !== null)) {
            res.locals.error = 'Your username is already registered! Use the log in form!';
        return next();
        }

        if (req.body.reg_username.length < 6) {
            res.locals.error = 'Username must be at least 6 characters long!';
        return next();
        }

        //create user
        var newUser = new PlayerModel();
        newUser.name = req.body.reg_name;
        newUser.username = req.body.reg_username;
        newUser.password = req.body.reg_password;
        newUser.ifpa_id = req.body.reg_ifpaid;
        newUser.birthdate = req.body.reg_birthdate;
        if(typeof req.body.adminrole !== 'undefined' && req.body.adminrole == 'on')
            newUser.admin_role = true;
        else
            newUser.admin_role = false;
        newUser.save(function (err) {

        if(newUser.admin_role == true)
            req.session.adminid = newUser._id;
        else
            req.session.userid = newUser._id;


            req.session.save();
            //redirect to /competition
            return res.redirect('/competition');
        });
    });
        //next();
    };
};