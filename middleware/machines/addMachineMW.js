/**
 * Ha nincs POST adat next()-et hív. Egyébként beszúr egy új gépet az adatbázisba, majd next()-et hív.
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {

    var MachineModel = requireOption(objectrepository, 'MachineModel');

    return function (req, res, next) {
    
        if(req.method === 'GET')
            return next();

    //not enough parameter
    if ((typeof req.body === 'undefined') || (typeof req.body.name === 'undefined') ||
    (typeof req.body.manufacturer === 'undefined') || (typeof req.body.prodyear === 'undefined')) {
        res.locals.error = 'Fill all brackets!';
        return next();
    }

    //lets find the machine
    MachineModel.findOne({
        name: req.body.name
    }, function (err, result) {

        if ((err) || (result !== null)) {
            res.locals.error = 'This machine is already exist!';
        return next();
        }

        //create machine
        var newMachine = new MachineModel();
        newMachine.name = req.body.name;
        newMachine.manufacturer = req.body.manufacturer;
        newMachine.year = req.body.prodyear;
        newMachine.save(function (err) {

            //redirect to /machines
            return res.redirect('/machines');
        });
    });
    };
};