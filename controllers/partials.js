var partialsTemp = [
    "login",
    "profile"
];

exports.partialRender = function (req, res) {

    var pageIndex = req.params[0];

    if (partialsTemp.indexOf("" + pageIndex) > -1) {
        res.render("partials/" + pageIndex, {});
    } else {
        res.render("common/404", {});
    }
};