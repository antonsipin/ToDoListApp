const isAuth = (req, res, next) => {
    if (req.session && req.session.user) {
        return next()
    } else {
        console.log('User is not authorized')
        res.status(400).json({ error: 'User is not authorized'})
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