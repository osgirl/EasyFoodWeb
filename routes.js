var routes = require('./controllers');
var user = require('./controllers/user');
module.exports = function (app) {
  app.get('/', routes.index);
  app.get('/users', user.list);

  web(app);
  api(app);
};
function web(app) {

}
function api(app) {

}

