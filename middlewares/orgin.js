function orgin(req, res, next) {
    if (!req.header("app-origin") || req.header("app-origin") != "from_anselme")
        return res.send({
            message: "This App is for Authorized Users Only !",
        });
    next();
}

module.exports = orgin;
