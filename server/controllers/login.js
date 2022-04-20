const loginRoute = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const config = require('../utils/config')

loginRoute.post('/', async (request, response) => {

  const body = request.body

  const user = await User.findOne({ username: body.username })

  const passwordCorrect = user === null ? false : await bcrypt.compare(body.password, user.password)

  if(!(user && passwordCorrect)){
    return response.status(401).json({
      error: 'invalid user or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id
  }

  const token = jwt.sign(userForToken, config.SECRET)

  return response.status(200).send({ token, username: user.username, name: user.name }).end()

})

module.exports = loginRoute