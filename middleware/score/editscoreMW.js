/**
 * Ha a pontszám létezik az adatbázisban, akkor módosítja az adatokat és átirányít a /competition-re
 * Ellenkező esetben next()-et hív hibaüzenettel
 */
 const requireOption = require('../requireOption');

 module.exports = function (objectrepository) {
 
     var ScoreModel = requireOption(objectrepository, 'ScoreModel');
 
     return function (req, res, next) {
     
         if(req.method === 'GET')
             return next();
 
     //not enough parameter
     if ((typeof req.body === 'undefined') || (typeof req.body.score === 'undefined')) {
         res.locals.error = 'Fill all brackets!';
         return next();
     }
 
     //lets find the score
     ScoreModel.findOne({_id: req.params.score_id}, (err, result) => {
 
         if ((err) || (result === null)) {
             res.locals.error = 'This machine does not exist!';
         return next();
         }
 
         //create score
         result.score = req.body.score;
         result.save(function (err) {
 
             req.session.success = 'Score successfully updated!';
             req.session.save();
             //redirect to /competition
             return res.redirect('/competition');
         });
     });
     };
 };