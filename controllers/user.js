/*
 * GET users listing.
 */
var user = require("../proxy/user");

exports.list = function (req, res) {
    user.usersList({}, function (err, result) {
        res.json({result: result});
    });
};