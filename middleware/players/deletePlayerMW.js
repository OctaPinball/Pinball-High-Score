/**
 * Ha a player_id létezik az adatbázisban, akkor törli és átirányít a /players-re
 * Ellenkező esetben next()-et hív hibaüzenettel
 */
 const requireOption = require('../requireOption');

 module.exports = function(objectrepository) {
 
    var PlayerModel = requireOption(objectrepository, 'PlayerModel');
 
     return function(req, res, next) {
 
        PlayerModel.deleteOne({ _id: req.params.player_id }, (err, score) => {
            if (err || !score) {
                return next(err);
            }
        });
 
        return res.redirect('/players');
     };
 };;