const express = require('express')
const mongoose = require('mongoose')
require('express-async-errors')

const blogRoute = require('./controllers/blogs')
const loginRoute = require('./controllers/login')
const userRoute = require('./controllers/users')


const configuration = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')



mongoose.connect(configuration.MONGODB_URL_CONNECT).then(result => {
  logger.information('connection success mongoDb')
}).catch(error => {
  logger.advertence(error)
})

const app = express()

app.use(express.json())
app.use(middleware.token)

app.use(middleware.morgan)

app.use('/api/blogs', blogRoute)
app.use('/api/users', userRoute)
app.use('/api/login', loginRoute)

if(configuration.ENVIRONMENT==='test') {
  const testingRoute = require('./controllers/testing')
  app.use('/api/testing', testingRoute)
}

app.use(middleware.unknownMiddleware)
app.use(middleware.handleError)

module.exports = app

