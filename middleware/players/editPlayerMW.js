/**
 * Ha a player_id létezik az adatbázisban, akkor módosítja az adatokat és átirányít a /players-re
 * Ellenkező esetben next()-et hív hibaüzenettel
 */
 const requireOption = require('../requireOption');

 module.exports = function (objectrepository) {
 
     var PlayerModel = requireOption(objectrepository, 'PlayerModel');
 
     return function (req, res, next) {
     
         if(req.method === 'GET')
             return next();
 
     //not enough parameter
     if ((typeof req.body === 'undefined') || (typeof req.body.username === 'undefined') ||
     (typeof req.body.password === 'undefined') || (typeof req.body.name === 'undefined') ||
     (typeof req.body.birthdate === 'undefined') || (typeof req.body.ifpaid === 'undefined')){
         res.locals.error = 'Fill all brackets!';
         return next();
     }
 
     //lets find the machine
     PlayerModel.findOne({_id: req.params.player_id}, (err, result) => {
 
         if ((err) || (result === null)) {
             res.locals.error = 'This player does not exist!';
         return next();
         }

         if(result.admin_role === true && req.params.player_id !== req.session.adminid)
         {
            req.session.errortext = 'You cannot modify other admins!';
            req.session.save();
            return res.redirect('/players');
         }
 
         //create machine
         result.username = req.body.username;
         result.password = req.body.password;
         result.name = req.body.name;
         result.birthdate = req.body.birthdate;
         result.ifpa_id = req.body.ifpaid;
         result.save(function (err) {

             req.session.success = 'Player successfully updated!';
             req.session.save();
             //redirect to /machines
             return res.redirect('/players');
         });
     });
     };
 };