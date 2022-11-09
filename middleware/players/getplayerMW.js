const requireOption = require('../requireOption');

module.exports = function (objectrepository) {

    var PlayerModel = requireOption(objectrepository, 'PlayerModel');

    return function (req, res, next) {
        PlayerModel.findOne({_id: req.params.player_id}, (err, player) => {
            if(err){
                return next(err);
            }
            res.locals.player = player;
            return next();
        });
    };
};