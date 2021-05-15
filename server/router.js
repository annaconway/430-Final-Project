const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  // HOME PAGES
  app.get('/', mid.requiresSecure, controllers.Site.homePage);

  // INFO PAGES
  app.get('/info', mid.requiresSecure, controllers.Site.infoPage);

  // ACCOUNT PAGES
  app.get('/app', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.post('/changePass', mid.requiresSecure, mid.requiresLogout, controllers.Account.changePassword);

  // BUILDER + APP PAGES
  app.get('/getRoutines', mid.requiresLogin, controllers.Routine.getRoutines);
  app.get('/getOilyRoutines', mid.requiresLogin, controllers.Routine.getOilyRoutines);
  app.get('/getDryRoutines', mid.requiresLogin, controllers.Routine.getDryRoutines);
  app.get('/getNormalRoutines', mid.requiresLogin, controllers.Routine.getNormalRoutines);
  app.get('/getCombinationRoutines', mid.requiresLogin, controllers.Routine.getCombinationRoutines);
  app.post('/deleteRoutine', mid.requiresSecure, controllers.Routine.deleteRoutine);
  app.post('/updateRoutine', mid.requiresSecure, controllers.Routine.updateRoutine);
  app.get('/builder', mid.requiresLogin, controllers.Routine.builderPage);
  app.post('/builder', mid.requiresLogin, controllers.Routine.buildRoutine);

  // ADMIN PAGES
  app.get('/admin', mid.requiresSecure, controllers.Site.adminPage);
};

module.exports = router;
