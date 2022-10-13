/**
 * Megvizsgálja hogy létezik a törölni kívánt gép az adatbázisban, ha ez teljesül akkkor törli a gépet és átirányít a /machines-re.
 * Ellenkező esetben next()-et hív egy hibaüzenettel.
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        next();
    };
};