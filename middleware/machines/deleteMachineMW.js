/**
 * Megvizsgálja hogy létezik a törölni kívánt gép az adatbázisban, ha ez teljesül akkkor törli a gépet és átirányít a /machines-re.
 * Ellenkező esetben next()-et hív egy hibaüzenettel.
 */
 const requireOption = require('../requireOption');

 module.exports = function(objectrepository) {

    var MachineModel = requireOption(objectrepository, 'MachineModel');

     return function(req, res, next) {
 
         MachineModel.deleteOne({ _id: req.params.machine_id }, (err, machine) => {
            if (err || !machine) {
                return next(err);
            }
        });
 
        return res.redirect('/machines');
     };
 };;