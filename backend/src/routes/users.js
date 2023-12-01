const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users-controller')

router
    .route('/signUp')
    .post(usersController.signUp)

router
    .route('/signIn')
    .post(usersController.signIn)

module.exports = router