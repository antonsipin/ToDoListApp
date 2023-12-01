require('dotenv').config()
const bcrypt = require('bcrypt')
const salt = process.env.saltRounds || 10
const response = require('../types/response')
const createToken = require('../helpers/createToken')
const userDestructuring = require('../helpers/userDestructuring')
const PrismaService = require('../config/prisma.service')

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
        if (e.message.includes('duplicate key')) {
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

module.exports = { signUp, signIn }