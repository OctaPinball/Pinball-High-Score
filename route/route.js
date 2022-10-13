const authMW = require('../middleware/auth/adminAuthMW');
const authMW = require('../middleware/auth/authMW');
const authMW = require('../middleware/auth/inverseAuthMW');
const authMW = require('../middleware/auth/loginMW');
const authMW = require('../middleware/auth/regMW');
const authMW = require('../middleware/auth/userAuthMW');
const authMW = require('../middleware/machines/addMachineMW');
const authMW = require('../middleware/machines/deleteMachineMW');
const authMW = require('../middleware/machines/editMachineMW');
const authMW = require('../middleware/players/deletePlayerMW');
const authMW = require('../middleware/players/editPlayerMW');
const authMW = require('../middleware/score/addscoreMW');
const authMW = require('../middleware/score/deletescoreMW');
const authMW = require('../middleware/score/editscoreMW');
const authMW = require('../middleware/redirectMW');
const authMW = require('../middleware/renderMW');


module.exports = function (app) {
    const objRepo = {};
      
    
    //-- COMPETITION --
    app.use('/competition',
    authMW(objRepo),
    renderMW(objRepo, 'competition'));

    
    //-- MACHINES --
    app.use('/machines',
    adminAuthMW(objRepo),
    renderMW(objRepo, 'machines'));

    app.use('/machines/new',
    adminAuthMW(objRepo),
    addMachineMW(objRepo),
    renderMW(objRepo, 'machines/new'));

    app.use('/machines/edit/:machine_id',
    adminAuthMW(objRepo),
    editMachineMW(objRepo),
    renderMW(objRepo, 'machines/edit/:machine_id'));

    app.use('/machines/delete/:machine_id',
    adminAuthMW(objRepo),
    deleteMachineMW(objRepo),
    renderMW(objRepo, 'machines/delete/:machine_id'));
    
    
    //-- PLAYERS --
    app.use('/players',
    adminAuthMW(objRepo),
    renderMW(objRepo, 'players'));

    app.use('/player/edit/:machine_id',
    adminAuthMW(objRepo),
    editPlayerMW(objRepo),
    renderMW(objRepo, 'player/edit/:machine_id'));

    app.use('/player/delete/:machine_id',
    adminAuthMW(objRepo),
    deletePlayerMW(objRepo),
    renderMW(objRepo, 'player/delete/:machine_id'));    
    

    //-- SCORE --
    app.use('/addscore',
    userAuthMW(objRepo),
    addscoreMW(objRepo),
    renderMW(objRepo, 'addscore'));
    
    app.use('/score/edit/:machine_id/:player_id',
    adminAuthMW(objRepo),
    editscoreMW(objRepo),
    renderMW(objRepo, 'score/edit/:machine_id/:player_id'));

    app.use('/score/delete/:machine_id/:player_id',
    adminAuthMW(objRepo),
    deletescoreMW(objRepo),
    renderMW(objRepo, 'score/delete/:machine_id/:player_id')); 


    //-- LOGIN --
    app.use('/',
    inverseAuthMW(objRepo),
    regMW(objRepo),
    loginMW(objRepo),
    renderMW(objRepo, 'index'));

    app.get('/logout',
    authMW(objRepo),
    redirectMW('/competition'));
    
}