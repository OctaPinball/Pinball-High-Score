const requireOption = require('../requireOption');

module.exports = function (objectrepository) {

    var ScoreModel = requireOption(objectrepository, 'ScoreModel');

    return function (req, res, next) {
        ScoreModel.find({}, (err, scores) => {
            if(err){
                return next(err);
            }
            res.locals.scores = scores;
            return next();
        }).sort({score: -1});
    };
};