const requireOption = require('../requireOption');

module.exports = function (objectrepository) {

    var PlayerModel = requireOption(objectrepository, 'PlayerModel');

    return function (req, res, next) {
        PlayerModel.find({}, (err, players) => {
            if(err){
                return next(err);
            }
            res.locals.players = players;
            return next();
        }).sort({admin_role: -1, name: 1});
    };
};