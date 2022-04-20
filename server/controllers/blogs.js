const blogRoute = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const helperToken = require('../utils/token_helper')
// const logger = require('../utils/logger')

blogRoute.get('/', async (request, response) => {
  const result = await Blog.find({}).populate('user', { username: 1, name: 1 })
  return response.json(result)
})

blogRoute.get('/:id', async (request, response) => {

  const { id } = request.params
  const result = await Blog.find({ _id : id })

  if(result.length > 0){
    return response.json(result)
  }

  return response.status(404).json({
    error: 'blog no found by this id'
  })
})

blogRoute.post('/', async (request, response) => {

  const token = request.token

  const userAuthenticated = await helperToken.validToken(token)

  if(!userAuthenticated){
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }

  const user = await User.findById(userAuthenticated.id)

  const body = request.body
  body.user = user.id

  const newBlog = new Blog(request.body)
  const result = await newBlog.save()
  const blog = result.toJSON()

  user.blogs = user.blogs.concat(blog.id)
  await User.findByIdAndUpdate({ _id: user.id }, user)

  return response.status(201).json(blog)

})


blogRoute.delete('/:id', async (request, response) => {

  const { id } = request.params
  const token = request.token

  const userAuthenticated = await helperToken.validToken(token)

  if(!userAuthenticated){
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }

  const blogUser = await Blog.findById( { _id : id })

  if(!blogUser){
    return response.status(404).json({
      error: 'There isn\'t blog by this ID'
    })
  }

  const isTheUserBlog = blogUser.user.toString() !== userAuthenticated.id

  if(isTheUserBlog){
    return response.status(401).json({
      error: 'This users can\'t delete this blog '
    })
  }

  await Blog.findByIdAndRemove({ _id : blogUser.id })
  return response.status(204).end()


})

blogRoute.put('/:id', async (request, response) => {

  const { id } = request.params
  const body = request.body

  const result = await Blog.findByIdAndUpdate({ _id : id }, body, { new: true })
    .populate('user', { username: 1, name: 1 })

  if(result){
    return response.json(result)
  }

  return response.status(404).json({
    error: 'There are not blog with this ID in db'
  })
})


blogRoute.patch('/:id', async (request,response) => {

  const id = request.params.id
  const body = request.body

  const result = await Blog.findByIdAndUpdate({ _id:id }, body, { new: true })

  if(result) {
    return response.json(result)
  }

  return response.status(304).json({
    error: 'This blog was not modified'
  })

})

module.exports = blogRoute