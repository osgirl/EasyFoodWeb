var routes = require('./controllers');
var user = require('./controllers/user');
var partial = require("./controllers/partials");

module.exports = function (app) {

    web(app);
    api(app);
//    app.get("*", function (req, res) {
//        res.render("common/404");
//    });
};

function web(app) {
//    app.get('/', routes.index);
    app.get('/users', user.list);
  app.get("/", function (req, res) {
    res.render("test");
  });

    app.get("\/partials\/?([^\/]+)?(.html)\/?", partial.partialRender);
}
function api(app) {

}

