const express = require('express')
const router = express.Router()
const tasksController = require('../controllers/tasks-controller')

router
  .route('/')
  .get(tasksController.getTasks)
  .post(tasksController.addTask)

router
  .route('/:id')
  .delete(tasksController.deleteTask)

router
  .route('/status')
  .put(tasksController.resolveTask)

router
  .route('/name')
  .put(tasksController.updateTask)

module.exports = router
