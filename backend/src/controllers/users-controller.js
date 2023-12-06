import 'dotenv/config'
import bcrypt from 'bcrypt'
import response from '../types/response.js'
import createToken from '../helpers/createToken.js'
import userDestructuring from '../helpers/userDestructuring.js'
import PrismaService from '../config/prisma.service.js'
const salt = process.env.saltRounds || 10

const prismaService = new PrismaService()
const prisma = prismaService.client

const signUp = async (req, res) => {
    const { name, email, password } = req.body
    try {
        if (name && email && password) {
            const hashPass = await bcrypt.hash(password, Number(salt))
            const newUser = {
                name,
                email,
                password: hashPass,
                accessToken: '',
                refreshToken: '',
                tasks: { 
                    create: [] 
                }
            }

            await prisma.user.create({ data: newUser })
            res.status(201).json(response('Successfully', '', userDestructuring(newUser)))
        } else {
            res.status(401).json(response('Error', 'All fields must be filled'))
        }
    } catch (e) {
        if (e.message.includes('Unique constraint failed')) {
            res.status(401).json(response('Error', 'The user already exists'))
        } else {
        console.log(e.message)
        res.status(500).json(response('Error', 'Something went wrong'))
        }
    }
}

const signIn = async (req, res) => {
    const { email, password } = req.body
    try {
        if (email && password) {
            let user = await prisma.user.findUnique({ 
                where: { email } 
            })
            if (user) {
                const isValidPassword = await bcrypt.compare(password, user.password)
                if (isValidPassword) {
                    const payload = { email }
                    user.accessToken = createToken('access', payload)
                    user.refreshToken = createToken('refresh', payload)
                    await prisma.user.update({
                        where: { email },
                        data: user
                    })

                    res.status(200).json(response('Successfully', '', userDestructuring(user)))
                } else {
                    res.status(401).json(response('Error', 'Wrong Email or Password'))
                }
            } else {
                res.status(401).json(response('Error', 'User does not exist'))
            }
        } else {
            res.status(401).json(response('Error', 'Missing Email or Password'))
        }
    } catch (e) {
        console.log(e.message)
        res.status(500).json(response('Error', 'Something went wrong'))
    }
}

const logout = async (req, res) => {
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

export { 
    signUp,
    signIn,
    logout
}