module.exports.checkAuth = function (req, res, next){

    const userId = req.session.userId

    if(!userId){
        return res.redirect('/login')
    }

    next()

}