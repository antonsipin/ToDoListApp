require('dotenv').config()
const Task = require('../models/task.model')
const response = require('../types/response')

const addTask = async (req, res) => {
  const { taskName, taskDescription } = req.body

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
        message: taskDescription || ''
      })

    await newTask.save()
    res.send(response('Successfully', '', newTask))
      
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
  const { id } = req.body

  try {
    const task = await Task.findOne({ id })
    task.status = !task.status
    await task.save()
    res.send(response('Successfully'))

  } catch (err) {
    res.send(response('Error', String(e)))
  }
}

const getTasks = async (req, res) => {
  const tasks = await Task.find()

  try {
    res.send(response('Successfully', '', tasks))

  } catch (error) {
    res.send(response('Error', String(e)))
  }
}

const updateTask = async (req, res) => {
  const { id, taskName, taskDescription } = req.body

  try {
    const tasks = await Task.find()

    if (tasks.some((task) => task.name === taskName)) {
      res.send(response('Error', 'The task already exists'))
    } else {
      const updateTask = await Task.findOne({ id })
      updateTask.name = taskName
      updateTask.message = taskDescription
      
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
