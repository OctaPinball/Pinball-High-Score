const regMW = require('../auth/regMW');
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {

    var MachineModel = requireOption(objectrepository, 'MachineModel');

    return function (req, res, next) {

        if(req.method === 'GET' && typeof req.session.selectedmachine === 'undefined')
            return next();


        var machineselect
        if(typeof req.body !== 'undefined' && typeof req.body.machineselect !== 'undefined')
        {
            machineselect = req.body.machineselect;
        }
        else
        {
            if(typeof req.session.selectedmachine !== 'undefined')
            {
                machineselect = req.session.selectedmachine._id;
            }
        }

        var found = false;
        for(var k = 0; k < res.locals.machines.length; k++)
        {
            if(res.locals.machines[k].equals(machineselect))
            {
                res.locals.machine = res.locals.machines[k].name;
                found = true;
                break;
            }
        }
        if(!found)
        {
            res.locals.error = 'Machine not found!';
            return next();
        }

        var newscores = [];
        for(var i = 0; i < res.locals.scores.length; i++)
        {
            if(res.locals.scores[i]._machine.equals(machineselect))
            {
                console.log("itt\n");
                for(var j = 0; j < res.locals.players.length; j++)
                {
                    if(res.locals.players[j]._id.equals(res.locals.scores[i]._player))
                    {
                        console.log("newscores");
                        newscores.push({
                            "score": res.locals.scores[i].score,
                            "score_id": res.locals.scores[i]._id,
                            "name": res.locals.players[j].name})
                    }
                }
            }
        }
        console.log(newscores);
        res.locals.newscores = newscores;

        return next();

    };
};