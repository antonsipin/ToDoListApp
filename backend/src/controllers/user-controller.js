require('dotenv').config()
const bcrypt = require('bcrypt')
const salt = process.env.saltRounds || 10
const User = require('../models/user.model')
const response = require('../types/response')

const serializeUser = (user) => {
    const { name, email, id} = user
    return {
        id,
        name,
        email
    }
}

const signUp = async (req, res) => {
    const { name, email, password } = req.body
    try {
        if (name && email && password) {
            const hashPass = await bcrypt.hash(password, Number(salt))
            const newUser = new User({
                name,
                email,
                password: hashPass,
                tasks: []
            })
            await newUser.save()
            req.session.user = serializeUser(newUser)
            res.send(response('Successfully', '', req.session.user))
        } else {
            res.send(response('Error', 'Missing Email or Password'))
        }
    } catch (e) {
        if (e.message.includes('duplicate key')) {
            res.send(response('Error', 'The user already exists'))
        } else {
        res.send(response('Error', String(e)))
        }
    }
}

const signIn = async (req, res) => {
    const { email, password } = req.body
    try {
        if (email && password) {
            const user = await User.findOne({ email }).lean()
            if (user) {
                const validPassword = await bcrypt.compare(password, user.password)
                if (validPassword) {
                    req.session.user = serializeUser(user)
                    res.send(response('Successfully', '', req.session.user))
                } else {
                    res.send(response('Error', 'Wrong Email or Password'))
                }
            } else {
                res.send(response('Error', 'User does not exist'))
            }
        } else {
            res.send(response('Error', 'Missing Email or Password'))
        }
    } catch (e) {
        res.send(response('Error', String(e)))
    }
}

const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            res.send(response('Error', String(err)))
        } else {
            res.clearCookie(req.app.get('session cookie name'))
            res.send(response('Successfully'))
        }
    })
}

module.exports = { signUp, signIn, logout }