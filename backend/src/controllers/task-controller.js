require('dotenv').config()
const Task = require('../models/task.model')
const User = require('../models/user.model')
const response = require('../types/response')

const addTask = async (req, res) => {
  try {
    const { email } = req.session.user
    const { taskName, taskDescription } = req.body
    const user = await User.findOne({ email }).lean()
    const existTasks = user.tasks
    
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
    
    await User.findOneAndUpdate({ email }, { tasks: [...existTasks, newTask] })
    res.send(response('Successfully', '', newTask))
      
    } else {
      res.send(response('Error', 'The task already exists'))
    }
    } catch (e) {
    res.send(response('Error', String(e)))
  }
}

const deleteTask = async (req, res) => {

  try {
    const { id } = req.params
    const { email } = req.session.user
    const user = await User.findOne({ email }).lean()
    const updatedTasks = user.tasks.filter((task) => task.id !== id)

    await User.findOneAndUpdate({ email }, { tasks: updatedTasks})
    res.send(response('Successfully'))

  } catch (e) {
    res.send(response('Error', String(e)))
  }
}

const resolveTask = async (req, res) => {

  try {
    const { id } = req.body
    const { email } = req.session.user
    const user = await User.findOne({ email }).lean()
    const updatedTasks = user.tasks.map((task) => {
      if (task.id === id) {
        task.status = !task.status
      }
      return task
    })
    await User.findOneAndUpdate({ email }, { tasks: updatedTasks })
    res.send(response('Successfully'))

  } catch (e) {
    res.send(response('Error', String(e)))
  }
}

const getTasks = async (req, res) => {
  try {
    if (req.session.user) {
      const { email } = req.session.user
      const user = await User.findOne({ email }).lean()
      const tasks = user.tasks
      res.send(response('Successfully', '', tasks))
    } else {
      res.send(response('Error', 'The user is not found'))
    }
    
  } catch (e) {
    res.send(response('Error', String(e)))
  }
}

const updateTask = async (req, res) => {
  try {
    const { id, taskName, taskDescription } = req.body
    const { email } = req.session.user
    const user = await User.findOne({ email }).lean()
    if (user.tasks.some((task) => task.name === taskName)) {
      res.send(response('Error', 'The task already exists'))
    } else {
      const updatedTasks = user.tasks.map((task) => {
        if (task.id === id) {
          task.name = taskName
          task.message = taskDescription
        }
        return task
      })
      await User.findOneAndUpdate({ email }, { tasks: updatedTasks })
      res.send(response('Successfully'))
    }
  } catch (e) {
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
