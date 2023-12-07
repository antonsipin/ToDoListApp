import 'dotenv/config'
import response from '../utils/response.js'
import PrismaService from '../config/prisma.service.js'
import { Request, Response } from 'express'

const prismaService = new PrismaService()
const prisma = prismaService.client

const addTask = async (req: Request, res: Response) => {
  try {
    const { taskName, taskDescription, email } = req.body
    
      if (taskName) {
        const existUserTasks: [{ name: string }] = await prisma.$queryRaw`SELECT "Task"."name" FROM "Task" LEFT JOIN "User" on "Task"."userId" = "User"."id" WHERE "User"."email" = ${email};`

        const [{ id }]: [{ id: number }] = await prisma.$queryRaw`SELECT "id" FROM "User" WHERE "email" = ${email};`

        const newTask = {
          name: taskName,
          status: false,
          isUpdate: false,
          isLoaded: false,
          message: taskDescription || '',
          userId: id
        }

        if (existUserTasks.length) {
          if (!existUserTasks.some((task: { name: string }) => task.name === taskName)) {
          
          const result = await prisma.task.create({
            data: newTask
          })
          res.status(201).json(response('Successfully', '', result))
            
          } else {
            res.status(400).json(response('Error', 'The task already exists', {}))
          }
        } else {
            await prisma.task.create({
              data: newTask
            })
            res.status(201).json(response('Successfully', '', newTask))
        }
      } else {
          res.status(400).json(response('Error', 'Can not add empty task', {}))
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.log(e.message)
        res.status(500).json(response('Error', 'Something went wrong', {}))
      } else {
        console.log(e)
      }
  }
}

const deleteTask = async (req: Request, res: Response) => {

  try {
    const { id } = req.params
    
    await prisma.$queryRaw`DELETE FROM "Task" WHERE "Task"."id" = ${Number(id)};`
    res.status(200).json(response('Successfully', '', { id }))
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e.message)
      res.status(500).json(response('Error', 'Something went wrong', {}))
    } else {
      console.log(e)
    }
  }
}

const resolveTask = async (req: Request, res: Response) => {
  try {
    const { id, status } = req.body

    await prisma.$queryRaw`UPDATE "Task" SET "status" = ${!status} WHERE "id" = ${Number(id)}`
    res.status(200).json(response('Successfully', '', { id }))
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message)
      res.status(500).json(response('Error', 'Something went wrong', {}))
    } else {
      console.log(e)
    }
  }
}

const getTasks = async (req: Request, res: Response) => {
  const { email } = req.body
  try {
      const existUserTasks: [{
        id: number,
        status: boolean,
        isUpdate: boolean,
        message: string,
        userId: number
      }] = await prisma.$queryRaw`SELECT "Task"."id", "Task"."name", "Task"."status", "Task"."isUpdate", "Task"."isLoaded", "Task"."message", "Task"."userId" FROM "Task" LEFT JOIN "User" on "Task"."userId" = "User"."id" WHERE "User"."email" = ${email};`

      res.status(200).json(response('Successfully', '', existUserTasks))
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message)
      res.status(500).json(response('Error', 'Something went wrong', {}))
    } else {
      console.log(e)
    }
  }
}

const updateTask = async (req: Request, res: Response) => {
  try {
    const { id, taskName, taskDescription } = req.body

    await prisma.$queryRaw`UPDATE "Task" SET "name" = ${taskName}, "message" = ${taskDescription} WHERE "id" = ${Number(id)}`
    res.status(200).json(response('Successfully', '', { id, name: taskName, message: taskDescription }))
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message)
      res.status(500).json(response('Error', 'Something went wrong', {}))
    } else {
      console.log(e)
    }
  }
}

export {
  addTask,
  deleteTask,
  resolveTask,
  getTasks,
  updateTask
}
