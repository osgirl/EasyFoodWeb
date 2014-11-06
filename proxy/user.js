
exports.usersList = function (conditions, callback) {
    var USER_LIST = "SELECT * FROM USERS WHERE ID = 1";
    db.q(USER_LIST, function (err, result) {
        callback(err, result);
    });
};


