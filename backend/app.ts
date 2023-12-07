import 'dotenv/config'
import express from 'express'
import createSocketServer from './socket'
import { createServer } from 'http'
import path from 'path'
import logger from 'morgan'
import indexRouter from './src/routes/index'
import tasksRouter from './src/routes/tasks'
import usersRouter from './src/routes/users'
import logoutRouter from './src/routes/logout'
import mainRouter from './src/routes/main'
import tokenMiddle from './src/middleware/token'
import cors from 'cors'
import PrismaService from './src/config/prisma.service'
const PORT = process.env.PORT || 3100

const app = express()
const server = createServer()
createSocketServer(server)
const prismaService = new PrismaService()
prismaService.connect()

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.resolve('../frontend/build')))

app.use('/', indexRouter)
app.use('/tasks', tokenMiddle, tasksRouter)
app.use('/users', usersRouter)
app.use('/logout', tokenMiddle, logoutRouter)
app.use('*', mainRouter)

server.on('request', app)
server.listen(PORT, () => {
  console.log('[Server]: Server has been started on port: ', PORT)
})

export default app
