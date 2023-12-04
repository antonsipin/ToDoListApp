require('dotenv').config()
const response = require('../types/response')
const PrismaService = require('../config/prisma.service')

const prismaService = new PrismaService()
const prisma = prismaService.client

const addTask = async (req, res) => {
  try {
    const { taskName, taskDescription, email } = req.body
    
      if (taskName) {
        const existUserTasks = await prisma.$queryRaw`SELECT "Task"."name" FROM "Task" LEFT JOIN "User" on "Task"."userId" = "User"."id" WHERE "User"."email" = ${email};`

        const [{ id }] = await prisma.$queryRaw`SELECT "id" FROM "User" WHERE "email" = ${email};`

        const newTask = {
          name: taskName,
          status: false,
          isUpdate: false,
          isLoaded: false,
          message: taskDescription || '',
          userId: id
        }

        if (existUserTasks.length) {
          if (!existUserTasks.some((task) => task.name === taskName)) {
          
          const result = await prisma.task.create({
            data: newTask
          })
          res.status(201).json(response('Successfully', '', result))
            
          } else {
            res.status(400).json(response('Error', 'The task already exists'))
          }
        } else {
            await prisma.task.create({
              data: newTask
            })
            res.status(201).json(response('Successfully', '', newTask))
        }
      } else {
          res.status(400).json(response('Error', 'Can not add empty task'))
      }
    } catch (e) {
      console.log(e.message)
      res.status(500).json(response('Error', 'Something went wrong'))
  }
}

const deleteTask = async (req, res) => {

  try {
    const { id } = req.params
    
    await prisma.$queryRaw`DELETE FROM "Task" WHERE "Task"."id" = ${Number(id)};`
    res.status(200).json(response('Successfully', '', { id }))
  } catch (e) {
    console.log(e.message)
    res.status(500).json(response('Error', 'Something went wrong'))
  }
}

const resolveTask = async (req, res) => {
  try {
    const { id, status } = req.body

    await prisma.$queryRaw`UPDATE "Task" SET "status" = ${!status} WHERE "id" = ${Number(id)}`
    res.status(200).json(response('Successfully', '', { id }))
  } catch (e) {
    console.log(e.message)
    res.status(500).json(response('Error', 'Something went wrong'))
  }
}

const getTasks = async (req, res) => {
  const { email } = req.body
  try {
      const existUserTasks = await prisma.$queryRaw`SELECT "Task"."id", "Task"."name", "Task"."status", "Task"."isUpdate", "Task"."isLoaded", "Task"."message", "Task"."userId" FROM "Task" LEFT JOIN "User" on "Task"."userId" = "User"."id" WHERE "User"."email" = ${email};`

      res.status(200).json(response('Successfully', '', existUserTasks))
  } catch (e) {
    console.log(e.message)
    res.status(500).json(response('Error', 'Something went wrong'))
  }
}

const updateTask = async (req, res) => {
  try {
    const { id, taskName, taskDescription } = req.body

    await prisma.$queryRaw`UPDATE "Task" SET "name" = ${taskName}, "message" = ${taskDescription} WHERE "id" = ${Number(id)}`
    res.status(200).json(response('Successfully', '', { id, name: taskName, message: taskDescription }))
  } catch (e) {
    console.log(e.message)
    res.status(500).json(response('Error', 'Something went wrong'))
  }
}

module.exports = {
  addTask,
  deleteTask,
  resolveTask,
  getTasks,
  updateTask
}
