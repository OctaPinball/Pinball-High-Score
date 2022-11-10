const adminAuthMW = require('../middleware/auth/adminAuthMW');
const authMW = require('../middleware/auth/authMW');
const inverseAuthMW = require('../middleware/auth/inverseAuthMW');
const loginMW = require('../middleware/auth/loginMW');
const logoutMW = require('../middleware/auth/logoutMW');
const regMW = require('../middleware/auth/regMW');
const userAuthMW = require('../middleware/auth/userAuthMW');
const sessionloaderMW = require('../middleware/auth/sessionloaderMW');
const addMachineMW = require('../middleware/machines/addMachineMW');
const getMachineMW = require('../middleware/machines/getMachineMW');
const getMachinesMW = require('../middleware/machines/getMachinesMW');
const deleteMachineMW = require('../middleware/machines/deleteMachineMW');
const editMachineMW = require('../middleware/machines/editMachineMW');
const deletePlayerMW = require('../middleware/players/deletePlayerMW');
const getplayersMW = require('../middleware/players/getplayersMW');
const getplayerMW = require('../middleware/players/getplayerMW');
const dateadjustMW = require('../middleware/competition/dateadjustMW');
const editPlayerMW = require('../middleware/players/editPlayerMW');
const addscoreMW = require('../middleware/score/addscoreMW');
const deletescoreMW = require('../middleware/score/deletescoreMW');
const getscoreMW = require('../middleware/score/getscoreMW');
const getscoresMW = require('../middleware/score/getscoresMW');
const editscoreMW = require('../middleware/score/editscoreMW');
const scoreadjust = require('../middleware/competition/scoreadjust');
const competitionMW = require('../middleware/competition/competitionMW');
const savesearchMW = require('../middleware/competition/savesearchMW');
const savesearchfrommachinesMW = require('../middleware/competition/savesearchfrommachinesMW');
const redirectMW = require('../middleware/redirectMW');
const renderMW = require('../middleware/renderMW');

const PlayerModel = require('../models/player');
const MachineModel = require('../models/machine');
const ScoreModel = require('../models/score');


module.exports = function (app) {
    const objRepo = {
        PlayerModel: PlayerModel,
        MachineModel: MachineModel,
        ScoreModel: ScoreModel
    };
      
    
    //-- COMPETITION --
    app.use('/competition/:machine_id',
    sessionloaderMW(objRepo),
    savesearchfrommachinesMW(objRepo),
    redirectMW('/competition'));

    app.use('/competition',
    sessionloaderMW(objRepo),
    getMachinesMW(objRepo),
    getplayersMW(objRepo),
    getscoresMW(objRepo),
    competitionMW(objRepo),
    scoreadjust(objRepo),
    savesearchMW(objRepo),
    renderMW(objRepo, 'competition'));

    
    //-- MACHINES --
    app.use('/machines/new',
    sessionloaderMW(objRepo),
    adminAuthMW(objRepo),
    addMachineMW(objRepo),
    renderMW(objRepo, 'addmachine'));

    app.use('/machines/edit/:machine_id',
    sessionloaderMW(objRepo),
    adminAuthMW(objRepo),
    editMachineMW(objRepo),
    getMachineMW(objRepo),
    renderMW(objRepo, 'editmachine'));

    app.use('/machines/delete/:machine_id',
    sessionloaderMW(objRepo),
    adminAuthMW(objRepo),
    deleteMachineMW(objRepo),
    redirectMW('/machines'));

    app.use('/machines',
    sessionloaderMW(objRepo),
    adminAuthMW(objRepo),
    getMachinesMW(objRepo),
    renderMW(objRepo, 'machines'));
    
    
    //-- PLAYERS --
    app.use('/player/edit/:player_id',
    sessionloaderMW(objRepo),
    adminAuthMW(objRepo),
    editPlayerMW(objRepo),
    getplayerMW(objRepo),
    renderMW(objRepo, 'editplayer'));

    app.use('/player/delete/:player_id',
    sessionloaderMW(objRepo),
    adminAuthMW(objRepo),
    deletePlayerMW(objRepo),
    redirectMW('/players'));   

    app.use('/players',
    sessionloaderMW(objRepo),
    adminAuthMW(objRepo),
    getplayersMW(objRepo),
    dateadjustMW(objRepo),
    renderMW(objRepo, 'players'));
    

    //-- SCORE --   
    app.use('/scores/edit/:score_id',
    sessionloaderMW(objRepo),
    adminAuthMW(objRepo),
    editscoreMW(objRepo),
    getscoreMW (objRepo),
    renderMW(objRepo, 'editscore'));

    app.use('/scores/delete/:score_id',
    sessionloaderMW(objRepo),
    adminAuthMW(objRepo),
    deletescoreMW(objRepo),
    redirectMW('/competition'));

    app.use('/addscore',
    sessionloaderMW(objRepo),
    userAuthMW(objRepo),
    getMachinesMW(objRepo),
    addscoreMW(objRepo),
    renderMW(objRepo, 'addscore'));


    //-- LOGIN --
    app.get('/logout',
    sessionloaderMW(objRepo),
    authMW(objRepo),
    logoutMW(objRepo),
    redirectMW('/'));

    app.use('/',
    sessionloaderMW(objRepo),
    inverseAuthMW(objRepo),
    regMW(objRepo),
    loginMW(objRepo),
    renderMW(objRepo, 'index'));
    
    app.get('/favicon.ico',(req, res)=>{
        res.status(204);
        res.end();
    });
}