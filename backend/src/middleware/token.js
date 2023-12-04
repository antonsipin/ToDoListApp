require('dotenv').config()
const jwt = require('jsonwebtoken')
const { PrismaClient } = require('@prisma/client')
const { jwtToken } = process.env
const response = require('../types/response')

const checkToken = (req, res, next) => {
    const tokenToCheck = req.headers.authorization?.split(' ')[1]
    const prisma = new PrismaClient()
    
    if (jwtToken && tokenToCheck) {
        try {
            jwt.verify(tokenToCheck, jwtToken, async (err, decoded) => {
                try {
                    if (err) throw new Error(err)

                    const user = await prisma.user.findUnique({
                        where: { email: decoded.email }
                    })
                    if (!user || user.accessToken !== tokenToCheck) {
                        res.status(403).json(response('Error', 'Token not found'))
                    } else {
                        req.body.email = decoded.email
                        next()
                    }
                } catch (e) {
                    if (e.message.includes('jwt expired')) {
                        res.status(403).json(response('Error', 'Token Expired'))
                    } else {
                        console.log(e.message )
                        res.status(500).json(response('Error', e.message))
                    }
                }
            })
        } catch (e) {
            console.log(e.message )
            res.status(500).json(response('Error', e.message))
        }
    } else {
        console.log('Token not found')
        res.status(403).json(response('Error', 'Token not found'))
    }
}

module.exports = checkToken