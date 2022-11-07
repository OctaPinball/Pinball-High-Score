const requireOption = require('../requireOption');

module.exports = function (objectrepository) {

    var MachineModel = requireOption(objectrepository, 'MachineModel');

    return function (req, res, next) {

        if(typeof req.body.machineselect === 'undefined')
        {
            if(typeof req.session.selectedmachine !== 'undefined')
            {
                res.locals.selectedmachine = req.session.selectedmachine;
                console.log("def")
            }
            else
            {
                res.locals.selectedmachine = false;
                console.log("undef")
            }
            return next();
        }

        MachineModel.findOne({_id: req.body.machineselect}, (err, machine) => {
            if(err){
                return next(err);
            }
            req.session.selectedmachine = machine;
            res.locals.selectedmachine = machine;
            return next();
        });
    }
}