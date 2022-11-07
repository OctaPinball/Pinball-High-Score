const requireOption = require('../requireOption');

module.exports = function (objectrepository) {

    var ScoreModel = requireOption(objectrepository, 'ScoreModel');

    return function (req, res, next) {
        ScoreModel.findOne({_id: req.params.score_id}, (err, score) => {
            if(err){
                return next(err);
            }
            res.locals.score = score;
            return next();
        });
    };
};