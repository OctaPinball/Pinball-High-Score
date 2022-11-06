const requireOption = require('../requireOption');

module.exports = function (objectrepository) {

    var MachineModel = requireOption(objectrepository, 'MachineModel');

    return function (req, res, next) {
        MachineModel.findOne({_id: req.params.machine_id}, (err, machine) => {
            if(err){
                return next(err);
            }
            res.locals.machine = machine;
            return next();
        });
    };
};