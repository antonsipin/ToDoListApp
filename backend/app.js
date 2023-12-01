require('dotenv').config()
const express = require('express')
const createSocketServer = require('./socket')
const { createServer } = require('http')
const path = require('path')
const logger = require('morgan')
const indexRouter = require('./src/routes/index')
const tasksRouter = require('./src/routes/tasks')
const usersRouter = require('./src/routes/users')
const logoutRouter = require('./src/routes/logout')
const mainRouter = require('./src/routes/main')
const tokenMiddle = require('./src/middleware/token')
const cors = require('cors')
const PORT = process.env.PORT || 3100
const PrismaService = require('./src/config/prisma.service')

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

module.exports = app
