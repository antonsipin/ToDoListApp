import 'dotenv/config'
import response from '../utils/response.js'
import userDestructuring from '../helpers/userDestructuring.js'
import PrismaService from '../config/prisma.service.js'
import { Request, Response } from 'express'

const prismaService = new PrismaService()
const prisma = prismaService.client

export const logout = async (req: Request, res: Response) => {
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
            if (e instanceof Error) {
                console.log(`Logout error: ${e.message}`)
                res.status(500).json(response('Error', 'Logout error', {}))
            } else {
                console.log(e)
            }
        }
    } else {
        console.log('Logout error: missed email')
    }
}
