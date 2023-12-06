import 'dotenv/config'
import express from 'express'
import createSocketServer from './socket.js'
import { createServer } from 'http'
import path from 'path'
import logger from 'morgan'
import indexRouter from './src/routes/index.js'
import tasksRouter from './src/routes/tasks.js'
import usersRouter from './src/routes/users.js'
import logoutRouter from './src/routes/logout.js'
import mainRouter from './src/routes/main.js'
import tokenMiddle from './src/middleware/token.js'
import cors from 'cors'
import PrismaService from './src/config/prisma.service.js'
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
