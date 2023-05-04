require('dotenv').config()
const Task = require('../models/task.model')

const addTask = async (req, res) => {
  const { taskName } = req.body

  try {
      const id = Math.floor(Math.random()*100000).toString()
      const newTask = new Task({
        id,
        name: taskName,
        status: false,
        edit: false,
        isLoaded: false,
        message: ''
      })

    await newTask.save()
    const task = await Task.findOne({ id })
    setTimeout(() => {
      res.send(task)
    }, 100)

    } catch (e) {
    res.send(500).end()
  }
}

const deleteTask = async (req, res) => {
  const { id } = req.params

  try {
    await Task.deleteOne({ id })
    res.sendStatus(200)

  } catch (error) {
    res.send(500).end()
  }
}

const resolveTask = async (req, res) => {
  const { id, status } = req.body

  try {
    const task = await Task.findOne({ id })
    task.status = !status
    await task.save()
    res.send(task)

  } catch (err) {
    res.send(500).end()
  }
}

const getTasks = async (req, res) => {
  const tasks = await Task.find()

  try {
    setTimeout(() => {
      res.send(tasks)
    }, 0)

  } catch (error) {
    res.send(500).end()
  }
}

const updateTask = async (req, res) => {
  const { id, taskName } = req.body

  try {
    const task = await Task.findOne({ id })
    task.name = taskName
    task.save()
    res.sendStatus(200)

  } catch (error) {
    res.send(500).end()
  }
}

module.exports = {
  addTask,
  deleteTask,
  resolveTask,
  getTasks,
  updateTask
}
