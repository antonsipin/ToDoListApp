const isAuth = (req, res, next) => {
    if (req.session && req.session.user) {
        return next()
    } else {
        console.log('User not found')
    }
}

const userName = (req, res, next) => {
    if (req.session && req.session.user) {
        res.locals.userName = req.session.user.name
    }
    next()
}

module.exports = { 
    isAuth,
    userName
}