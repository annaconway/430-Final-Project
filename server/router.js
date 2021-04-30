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

  // BUILDER PAGES
  app.get('/getRoutines', mid.requiresLogin, controllers.Routine.getRoutines);
  app.get('/builder', mid.requiresLogin, controllers.Routine.builderPage);
  app.post('/builder', mid.requiresLogin, controllers.Routine.buildRoutine);

  // ADMIN PAGES
  app.get('/admin', mid.requiresSecure, controllers.Site.homePage);
};

module.exports = router;
