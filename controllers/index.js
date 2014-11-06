/*
 * GET home page.
 */
var user = require("../proxy/user");

exports.index = function (req, res) {

    user.usersList({}, function (err, result) {
        res.render("index", {result: result});
    });
};
