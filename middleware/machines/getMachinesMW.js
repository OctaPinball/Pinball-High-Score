const requireOption = require('../requireOption');

module.exports = function (objectrepository) {

    var MachineModel = requireOption(objectrepository, 'MachineModel');

    return function (req, res, next) {
        MachineModel.find({}, (err, machines) => {
            if(err){
                return next(err);
            }
            res.locals.machines = machines;
            return next();
        }).sort({name: 1});
    };
};