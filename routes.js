var routes = require('./controller');
var user = require('./controller/user');
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
