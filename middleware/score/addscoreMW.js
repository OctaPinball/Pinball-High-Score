/**
 * Ha a kijelölt flipperre még nincs pontszám beírva, akkor felveszi az adatbázisba a beírt pontszámot majd next()-et hív.
 * Ellenkező esetben next()-et hív hibaüzenettel.
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {

    var PlayerModel = requireOption(objectrepository, 'PlayerModel');
    var ScoreModel = requireOption(objectrepository, 'ScoreModel');
    var MachineModel = requireOption(objectrepository, 'MachineModel');

    return function (req, res, next) {

        if(req.method === 'GET')
            return next();
        MachineModel.findOne({_id: req.body.machineselect}, (err, machine) => {

            if ((err) || (machine === null)) {
                res.locals.error = 'The given machine does not exist!';

            return next();
            }

            PlayerModel.findOne({_id: req.session.userid}, (err, player) => {

                if ((err) || (player === null)) {
                    res.locals.error = 'The player does not exist!';
    
                return next();
                }

                ScoreModel.findOne({_player: player._id, _machine: machine._id}, (err, score) => {
                    if ((err) || (score !== null)) {
                        res.locals.error = 'You already have a score on the selected machine!';
                    return next();
                    }
                    
                    //create machine
                    res.locals.ok = 'Score successfully added!';
                    var newScore = new ScoreModel();
                    newScore.score = req.body.score;
                    newScore._player = player._id;
                    newScore._machine = machine._id;
                    newScore.save(function (err) {
                        //redirect to /machines
                        res.locals.ok = 'Score successfully added!';
                        return res.redirect('/addscore');
                    });
        
            });
    
        });

    });
    };
};