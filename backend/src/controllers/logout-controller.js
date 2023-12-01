require('dotenv').config()
const { PrismaClient } = require('@prisma/client')
const response = require('../types/response')
const userDestructuring = require('../helpers/userDestructuring')

const logout = async (req, res) => {
    const { email } = req.body

    if (email) {
        try {
            const prisma = new PrismaClient()
            const user = await prisma.user.update({
                where: { email },
                data: {
                    accessToken: '',
                    refreshToken: ''
                }
            })

            res.status(200).json(response('Successfully', '', userDestructuring(user)))

        } catch (e) {
            console.log(`Logout error: ${e.message}`)
            res.status(500).json(response('Error', 'Logout error'))
        }
    } else {
        console.log('Logout error: missed email')
    }
}

module.exports = { 
    logout
}