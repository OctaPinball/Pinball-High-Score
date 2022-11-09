const requireOption = require('../requireOption');

module.exports = function (objectrepository) {

    var MachineModel = requireOption(objectrepository, 'MachineModel');

    return function (req, res, next) {

        if(typeof req.params.machine_id !== 'undefined')
        {
            MachineModel.findOne({_id: req.params.machine_id}, (err, machine) => {
                if(err){
                    return next(err);
                }
                req.session.selectedmachine = machine;
                res.locals.selectedmachine = machine;
                return next();
            });
        }
    }
}