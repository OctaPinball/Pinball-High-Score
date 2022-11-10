/**
 * Ha a player_id létezik az adatbázisban, akkor törli és átirányít a /players-re
 * Ellenkező esetben next()-et hív hibaüzenettel
 */
 const requireOption = require('../requireOption');

 module.exports = function(objectrepository) {
 
    var PlayerModel = requireOption(objectrepository, 'PlayerModel');
 
     return function(req, res, next) {

        var logout = false;
        if(req.params.player_id === req.session.adminid)
        {
            logout = true;
        }

        PlayerModel.findOne({_id: req.params.player_id}, (err, player) => {
            if(err){
                return next(err);
            }
            
            if(player.admin_role === true && req.params.player_id !== req.session.adminid)
            {
                req.session.errortext = 'You cannot delete other admins!';
                req.session.save();
            }
            else
            {
                PlayerModel.deleteOne({ _id: req.params.player_id }, (err, score) => {
                    if (err || !score) {
                        return next(err);
                    }
                });
            }
        });

        if(logout)
            return res.redirect('/logout');
        else
            return res.redirect('/players');
     };
 };;