exports.isLoggedIn = function (req, res, next) {
    if (req.user){
        next();
    }else {
        return res.status(404).render('../views/logFail')
    }
};