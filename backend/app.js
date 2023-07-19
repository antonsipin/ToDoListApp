require('dotenv').config()
const express = require('express')
const createSocketServer = require('./socket')
const { createServer } = require('http')
const path = require('path')
const logger = require('morgan')
const indexRouter = require('./src/routes/index')
const taskRouter = require('./src/routes/task')
const mainRouter = require('./src/routes/main')
const dbConnect = require('./src/config/dbConnect')
const cors = require('cors')
const PORT = process.env.PORT || 3100

const app = express()
const server = createServer()
createSocketServer(server)
dbConnect()

app.set('session cookie name', 'sid')
app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.resolve('../frontend/build')))
app.use('/', indexRouter)
app.use('/task', taskRouter)
app.use('*', mainRouter)

server.on('request', app)
server.listen(PORT, () => {
  console.log('Server has been started on port: ', PORT)
})

module.exports = app
