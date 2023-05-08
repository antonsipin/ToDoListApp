require('dotenv').config()
const Task = require('../models/task.model')

const response = (result, error, data) => {
  return {
    result: result || '',
    error: error || '',
    data: data || {}
  }
}

const addTask = async (req, res) => {
  const { taskName } = req.body

  try {
    const existTasks = await Task.find()
    
    if (!existTasks.some((task) => task.name === taskName)) {
      const id = Math.floor(Math.random()*100000).toString()
      const newTask = new Task({
        id,
        name: taskName,
        status: false,
        isUpdate: false,
        isLoaded: false,
        message: ''
      })
    await newTask.save()
    setTimeout(() => {
      res.send(response('Successfully', '', newTask))
    }, 100)
      
    } else {
      res.send(response('Error', 'The task already exists'))
    }
    } catch (e) {
    res.send(response('Error', String(e)))
  }
}

const deleteTask = async (req, res) => {
  const { id } = req.params

  try {
    await Task.deleteOne({ id })
    res.send(response('Successfully'))

  } catch (error) {
    res.send(response('Error', String(e)))
  }
}

const resolveTask = async (req, res) => {
  const { id, status } = req.body

  try {
    const task = await Task.findOne({ id })
    task.status = !status
    await task.save()
    res.send(response('Successfully'))

  } catch (err) {
    res.send(response('Error', String(e)))
  }
}

const getTasks = async (req, res) => {
  const tasks = await Task.find()

  try {
    setTimeout(() => {
      res.send(response('Successfully', '', tasks))
    }, 0)

  } catch (error) {
    res.send(response('Error', String(e)))
  }
}

const updateTask = async (req, res) => {
  const { id, taskName } = req.body

  try {
    const tasks = await Task.find()

    if (tasks.some((task) => task.name === taskName)) {
      res.send(response('Error', 'The task already exists'))
    } else {
      const updateTask = await Task.findOne({ id })
      updateTask.name = taskName
      await updateTask.save()
      res.send(response('Successfully'))
    }
  } catch (error) {
    res.send(response('Error', String(e)))
  }
}

module.exports = {
  addTask,
  deleteTask,
  resolveTask,
  getTasks,
  updateTask
}
