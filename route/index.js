const adminAuthMW = require('../middleware/auth/adminAuthMW');
const authMW = require('../middleware/auth/authMW');
const inverseAuthMW = require('../middleware/auth/inverseAuthMW');
const loginMW = require('../middleware/auth/loginMW');
const logoutMW = require('../middleware/auth/logoutMW');
const regMW = require('../middleware/auth/regMW');
const userAuthMW = require('../middleware/auth/userAuthMW');
const addMachineMW = require('../middleware/machines/addMachineMW');
const getMachineMW = require('../middleware/machines/getMachineMW');
const getMachinesMW = require('../middleware/machines/getMachinesMW');
const deleteMachineMW = require('../middleware/machines/deleteMachineMW');
const editMachineMW = require('../middleware/machines/editMachineMW');
const deletePlayerMW = require('../middleware/players/deletePlayerMW');
const getplayersMW = require('../middleware/players/getplayersMW');
const editPlayerMW = require('../middleware/players/editPlayerMW');
const addscoreMW = require('../middleware/score/addscoreMW');
const deletescoreMW = require('../middleware/score/deletescoreMW');
const getscoreMW = require('../middleware/score/getscoreMW');
const getscoresMW = require('../middleware/score/getscoresMW');
const editscoreMW = require('../middleware/score/editscoreMW');
const competitionMW = require('../middleware/competition/competitionMW');
const savesearchMW = require('../middleware/competition/savesearchMW');
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
    app.use('/competition',
    authMW(objRepo),
    getMachinesMW(objRepo),
    getplayersMW(objRepo),
    getscoresMW(objRepo),
    competitionMW(objRepo),
    savesearchMW(objRepo),
    renderMW(objRepo, 'competition'));

    
    //-- MACHINES --
    app.use('/machines/new',
    adminAuthMW(objRepo),
    addMachineMW(objRepo),
    renderMW(objRepo, 'addmachine'));

    app.use('/machines/edit/:machine_id',
    adminAuthMW(objRepo),
    editMachineMW(objRepo),
    getMachineMW(objRepo),
    renderMW(objRepo, 'editmachine'));

    app.use('/machines/delete/:machine_id',
    adminAuthMW(objRepo),
    deleteMachineMW(objRepo),
    redirectMW('/machines'));

    app.use('/machines',
    adminAuthMW(objRepo),
    getMachinesMW(objRepo),
    renderMW(objRepo, 'machines'));
    
    
    //-- PLAYERS --
    app.use('/player/edit/:machine_id',
    adminAuthMW(objRepo),
    editPlayerMW(objRepo),
    renderMW(objRepo, 'player/edit/:machine_id'));

    app.use('/player/delete/:machine_id',
    adminAuthMW(objRepo),
    deletePlayerMW(objRepo),
    renderMW(objRepo, 'player/delete/:machine_id'));    

    app.use('/players',
    adminAuthMW(objRepo),
    renderMW(objRepo, 'players'));
    

    //-- SCORE --   
    app.use('/scores/edit/:score_id',
    adminAuthMW(objRepo),
    editscoreMW(objRepo),
    getscoreMW (objRepo),
    renderMW(objRepo, 'editscore'));

    app.use('/scores/delete/:score_id',
    adminAuthMW(objRepo),
    deletescoreMW(objRepo),
    redirectMW('/competition'));

    app.use('/addscore',
    userAuthMW(objRepo),
    getMachinesMW(objRepo),
    addscoreMW(objRepo),
    renderMW(objRepo, 'addscore'));


    //-- LOGIN --

    app.get('/logout',
    authMW(objRepo),
    logoutMW(objRepo),
    redirectMW('/'));

    app.use('/',
    inverseAuthMW(objRepo),
    regMW(objRepo),
    loginMW(objRepo),
    renderMW(objRepo, 'index'));
    
    app.get('/favicon.ico',(req, res)=>{
        res.status(204);
        res.end();
    });
}