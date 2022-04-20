const userRoute = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')

userRoute.get('/', async(request, response) => {

  const result = await User.find({}).populate('blogs', { url:1,title:1,author:1 })

  if(result){
    return response.json(result)
  }

  return response.status(404).json({
    error: 'there aren\'t users in Db'
  })

})

userRoute.get('/:id', async(request, response) => {

  const result = await User.find({ _id: request.params.id })

  if(result){
    return response.json(result)
  }

  return response.status(404).json({
    error: 'there aren\'t users in Db'
  })

})

userRoute.post('/', async (request, response) => {

  const body = request.body

  const passwordIsNotEmpty = !!body.password
  if(!(passwordIsNotEmpty)) return response.status(400).json({ error: 'password is required' })

  const passwordMinLenght = body.password.length < 3
  if(passwordMinLenght) return response.status(400).json({ error: 'password must have at least 3 digits' })


  const salt = bcrypt.genSaltSync(10)
  const hash = await bcrypt.hashSync(body.password, salt)


  const user = new User({
    username: body.username,
    name: body.name,
    password: hash,
  })

  const savedUser = await user.save()

  response.json(savedUser)

})

userRoute.delete('/:id', async (request, response) => {

  const result = await User.findByIdAndRemove(request.params.id)

  if(result){
    return response.json(result)
  }

  return response.status(404).json({
    error: 'there aren\'t users in Db'
  })

})

userRoute.put('/:id', async (request, response) => {

  const id = request.params.id
  const body = request.body

  const result = await User.findByIdAndUpdate({ _id: id }, body, { new : true })

  if(result){
    return response.json(result)
  }

  return response.status(404).json({
    error: 'user not found by this id'
  })

})


module.exports = userRoute