const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task-controller');

router
  .route('/')
  .get(taskController.renderTasks)

router
  .route('/delete')
  .post(taskController.deleteTask)

router
  .route('/changeStatus')
  .post(taskController.changeStatus)

router
  .route('/add')
  .post(taskController.addTask)

router
  .route('/resolve')
  .put(taskController.resolveTask)

module.exports = router;
