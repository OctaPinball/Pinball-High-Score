/**
 *  Egy adott gép módosításáért felelős MW.
 * 
 *   if(nincs POST adat)
 *       next()
 *   else if(form nem valid)
 *       next() hibaüzenettel
 *   else if(machine nem létezik)
 *       next() hibaüzenettel
 *   else
 *       machine frissítése adatbázisban
 *       átirányít /machines - ra
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
    MachineModel.findOne({_id: req.params.machine_id}, (err, result) => {

        if ((err) || (result === null)) {
            res.locals.error = 'This machine does not exist!';
        return next();
        }

        if ((err) || (result !== null)) {
            res.locals.error = 'This machine is already exist!';
        return next();
        }

        //create machine
        result.name = req.body.name;
        result.manufacturer = req.body.manufacturer;
        result.year = req.body.prodyear;
        result.save(function (err) {

            req.session.success = 'Machine successfully updated!';
            req.session.save();
            return res.redirect('/machines');
        });
    });
    };
};