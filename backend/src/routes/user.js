const express = require('express')
const router = express.Router()
const userController = require('../controllers/user-controller')

router
    .route('/create')
    .post(userController.signUp)

module.exports = router