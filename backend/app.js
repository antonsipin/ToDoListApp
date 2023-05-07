require('dotenv').config()
const express = require('express')
const path = require('path')
const logger = require('morgan')
const indexRouter = require('./src/routes/index')
const taskRouter = require('./src/routes/task')
const mainRouter = require('./src/routes/main')
const app = express()
const dbConnect = require('./src/config/dbConnect')
const PORT = process.env.PORT || 3100
const cors = require('cors')

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

app.listen(PORT, () => {
  console.log('Server has been started on port: ', PORT)
})

module.exports = app
