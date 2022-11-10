function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('. ');
}

module.exports = function (objectrepository) {


    return function (req, res, next) {

        if(typeof res.locals.players !== 'undefined')
        {
            for(var i = 0; i < res.locals.players.length; i++)
            {
                res.locals.players[i].adjbirthdate = formatDate(res.locals.players[i].birthdate);
            }
        }
        return next();
    }
};
