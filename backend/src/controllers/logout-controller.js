import 'dotenv/config'
import response from '../types/response.js'
import userDestructuring from '../helpers/userDestructuring.js'
import PrismaService from '../config/prisma.service.js'

const prismaService = new PrismaService()
const prisma = prismaService.client

export const logout = async (req, res) => {
    const { email } = req.body

    if (email) {
        try {
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
