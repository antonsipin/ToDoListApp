require('dotenv').config()
const Task = require('../models/task.model')

const addTask = async (req, res) => {
  try {
    const { taskName } = req.body
    console.log('taskName:', taskName)
      const id = Math.floor(Math.random()*1000).toString()
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
    console.log('task:', task)
    // setTimeout(() => {
    //   res.send(task)
    // }, 100)

    } catch (e) {
      res.send(500).end()
  }
};

const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.deleteOne({ id: req.body.id })
    const task = await Task.find()
    res.json(task)
  } catch (error) {
    res.send(500).end()
  }
}

const changeStatus = async (req, res) => {
  const { id, name, status, edit } = req.body
  try {
    const task = await Task.findOne({ name: req.body.name })
    task.status = !task.status
    await task.save()
    const tasks = await Task.find()
    res.send(tasks)
  } catch (error) {
    res.send(500).end()
  }
};

const resolveTask = async (req, res) => {
  try {
    const { id, status } = req.body

    const task = await Task.findOne({ id })
    task.status = !status
    await task.save()

    res.send(task)
  } catch (err) {
    res.send(500).end()
  }
}

const renderTasks = async (req, res) => {
  try {
    const tasks = await Task.find()

    setTimeout(() => {
      res.send(tasks)
    }, 0)

  } catch (error) {
    res.send(500).end()
  }
};

module.exports = {
  addTask,
  deleteTask,
  changeStatus,
  resolveTask,
  renderTasks
};
