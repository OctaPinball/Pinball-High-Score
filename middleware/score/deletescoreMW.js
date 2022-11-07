/**
 * Ha a pontszám létezik az adatbázisban, akkor törli és átirányít a /competition-re
 * Ellenkező esetben next()-et hív hibaüzenettel
 */
const requireOption = require('../requireOption');

module.exports = function(objectrepository) {

   var ScoreModel = requireOption(objectrepository, 'ScoreModel');

    return function(req, res, next) {

        ScoreModel.deleteOne({ _id: req.params.score_id }, (err, score) => {
           if (err || !score) {
               return next(err);
           }
       });

       return res.redirect('/competition');
    };
};;