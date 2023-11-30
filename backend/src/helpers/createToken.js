require('dotenv').config()
const jwt = require('jsonwebtoken')

const { jwtToken, jwtRefreshToken, tokenLife, refreshTokenLife } = process.env

    const createToken = (type = 'access', payload) => {

        if (jwtToken && jwtRefreshToken && tokenLife && refreshTokenLife) {

                switch (type) {
                    case 'access':
                            return jwt.sign(payload, jwtToken, { expiresIn: Number(tokenLife) })
                    case 'refresh':
                            return jwt.sign(payload, jwtRefreshToken, { expiresIn: String(refreshTokenLife)})
                    default:
                            return jwt.sign(payload, jwtToken, { expiresIn: Number(tokenLife) })
                }
        } else {
            console.log('.Env file not correct')
        }
    }



module.exports = createToken