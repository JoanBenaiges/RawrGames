const updateLoggedUser = (req, res, next) => {
    res.locals.loggedUser = req.session.currentUser

    next()
}
module.exports = { updateLoggedUser }

