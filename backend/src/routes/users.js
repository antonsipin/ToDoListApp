const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users-controller')

router
    .route('/signUp')
    .post(usersController.signUp)

router
    .route('/signIn')
    .post(usersController.signIn)

router
    .route('/logout')
    .get(usersController.logout)

module.exports = router