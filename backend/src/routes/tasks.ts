import express from 'express'
import { getTasks, addTask, deleteTask, resolveTask, updateTask } from '../controllers/tasks-controller'
const router = express.Router()

router
  .route('/')
  .get(getTasks)
  .post(addTask)

router
  .route('/:id')
  .delete(deleteTask)

router
  .route('/status')
  .put(resolveTask)

router
  .route('/name')
  .put(updateTask)

export default router
