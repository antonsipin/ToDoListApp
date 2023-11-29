require('dotenv').config()
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const { jwtToken } = process.env

const checkToken = (req, res, next) => {
    const tokenToCheck = req.headers.authorization?.split(' ')[1]
    if (jwtToken && tokenToCheck) {
        try {
            jwt.verify(tokenToCheck, jwtToken, async (err, decoded) => {
                try {
                    if (err) throw new Error(err)

                    const user = await User.findById(decoded.id)
                    if (!user || user.accessToken !== tokenToCheck) {
                        res.send(403).json({ error: 'Token not found' })
                    } else {
                        req.body.userId = decoded.id
                        next()
                    }
                } catch (e) {
                    if (e.message.includes('jwt expired')) {
                        res.status(403).json({ message: 'Token Expired' })
                    } else {
                        console.log(e.message )
                        res.status(500).json({ error: e.message })
                    }
                }
            })
        } catch (e) {
            console.log(e.message )
            res.status(500).json({ error: e.message })
        }
    } else {
        console.log('Token not found')
        res.status(500).json({ error: 'Token not found' })
    }
}

module.exports = checkToken