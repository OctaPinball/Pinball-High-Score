function formatScore(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

module.exports = function (objectrepository) {


    return function (req, res, next) {

        if(typeof res.locals.newscores !== 'undefined')
        {
            for(var i = 0; i < res.locals.newscores.length; i++)
            {
                res.locals.newscores[i].adjscore = formatScore(res.locals.newscores[i].score);
                console.log(res.locals.newscores[i].adjscore);
            }
        }
        return next();
    }
};