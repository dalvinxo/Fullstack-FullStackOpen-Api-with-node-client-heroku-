const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')

const apiHelperBlog = require('../utils/test_helpersBlogs')
const apiHelperUser = require('../utils/test_helperUser')

const ListEntitys = require('../utils/blogsForTest')

const api = supertest(app)

beforeAll(async () => {
  await User.deleteMany({})
  await Blog.deleteMany({})

  const { users, blogs } = ListEntitys

  for(let user of users){
    const newUser = await User(user).save()
    user.id = newUser._id.toString()
  }

  for(let blog of blogs) {
    blog.user = users[Math.floor(Math.random() * users.length)].id
    let blogObject = new Blog(blog)
    const result = await blogObject.save()
    await User.findByIdAndUpdate(blog.user, { $push: { blogs: result._id.toString() } })
  }
})

const getToken = async () => {
  const user = apiHelperUser.user()
  const response = await api
    .post('/api/login')
    .send(user)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const token = response.body.token
  return token
}

// beforeEach(async () => {
//   await Blogs.deleteMany({})

//   for(let blog of apiHelperBlog.blogs) {
//     let blogObject = new Blogs(blog)
//     await blogObject.save()
//   }
// })

describe('blogs testing', () => {

  describe('viewing blogs return formant correct', () => {

    test('blogs are returned response as json', async () => {
      await api
        .get(apiHelperBlog.url)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('property id is defined', async () => {
      const response = await api.get('/api/blogs')
      expect(response.body[0].id).toBeDefined()
    })

  })


  describe('valid new blog', () => {

    test('created blogs success', async () => {

      await api.post(apiHelperBlog.url)
        .send(apiHelperBlog.newBlog())
        .set({ Authorization: `bearer ${await getToken()}` })
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const responseBlog = await api.get('/api/blogs')

      expect(responseBlog.body).toHaveLength(ListEntitys.blogs.length + 1)
    })

    test('property likes set default value 0', async () => {

      const result = await api.post(apiHelperBlog.url)
        .send(apiHelperBlog.newBloglikeDefault())
        .set({ Authorization: `bearer ${await getToken()}` })
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const likes = result.body.likes

      expect(likes).toBeDefined()
      expect(likes).toEqual(0)
    })

    test('property title and url are missing', async () => {

      await api.post(apiHelperBlog.url)
        .send(apiHelperBlog.newBlogMissingTitleAndUrl())
        .set({ Authorization: `bearer ${await getToken()}` })
        .expect(400)
        .expect('Content-Type', /application\/json/)

    })
  })

  describe('delete blog', () => {

    test('delete blog success', async () => {

      const blogs = await api.get(apiHelperBlog.url).expect(200)

      const blog = blogs.body[0]

      expect(blog.id).toBeDefined()

      await api.delete(`${apiHelperBlog.url}/${blog.id.toString()}`)
        .set({ Authorization: `bearer ${await getToken()}` })
        .expect(204)

      const response = await api.get(apiHelperBlog.url)

      expect(response.body).toHaveLength(blogs.body.length - 1)
    })

    test('delete blog id fail not found', async () => {
      const blogs = await api.get(apiHelperBlog.url)
      const blog = blogs.body[0]

      await api.delete(`${apiHelperBlog.url}/${blog.id}`).set({ Authorization: `bearer ${await getToken()}` })
        .expect(204)

      await api.delete(`${apiHelperBlog.url}/${blog.id}`).set({ Authorization: `bearer ${await getToken()}` })
        .expect(404)
    })

    test('delete blog failt format id', async () => {
      const result = await api.delete(`${apiHelperBlog.url}/${321}`)
        .set({ Authorization: `bearer ${await getToken()}` })
        .expect(400)

      expect(result.body.error).toBeDefined()

    })

  })

  describe('update blog', () => {


    test('update blog by id success', async () => {

      const blogs = await api.get(apiHelperBlog.url)
        .expect(200)

      const blog = blogs.body[0]

      expect(blog.id).toBeDefined()

      const blogUpdated = await api.put(`${apiHelperBlog.url}/${blog.id}`)
        .send(apiHelperBlog.contentBlogUpdate())
        .expect(200)

      const blogsWithBlogUpdate = await api.get(apiHelperBlog.url)
        .expect(200)

      expect(blog).not.toEqual(blogUpdated.body)
      expect(blogsWithBlogUpdate.body).toContainEqual(blogUpdated.body)
    })

    test('update likes by id', async () => {

      const blogs = await api.get(apiHelperBlog.url)
        .expect(200)

      const blog = blogs.body[Math.floor(Math.random()*blogs.body.length)]

      const blogUpdated = await api.patch(`${apiHelperBlog.url}/${blog.id}`)
        .send({
          likes: 30
        })
        .expect(200)
        .expect('Content-Type', /application\/json/)


      const blogWithLikesUpdate = await api.get(`${apiHelperBlog.url}/${blog.id}`)
        .expect(200)

      expect(blog.likes).not.toBe(blogUpdated.body.likes)

      expect(blogWithLikesUpdate.body).toContainEqual(blogUpdated.body)

    })

    test('advertence blog format by id', async () => {
      const result = await api.get(`${apiHelperBlog.url}/${20}`)
        .expect(400)

      expect(result.body.error).toBeDefined()
    })

    test('advertence not found blog by id', async () => {
      await api.get(`${apiHelperBlog.url}/${'6242dc1ae47092e8f417c967'}`).expect(404)
    })

  })

})

describe('users testing', () => {


  describe('Athentication user', () => {

    test('login with correct credentials', async () => {

      const user = apiHelperUser.user()
      const response = await api
        .post('/api/login')
        .send(user)
        .expect('Content-Type', /application\/json/)

      expect(response.status).toBe(200)
      expect(response.body.token).toBeDefined()
    }
    )

    test('login with incorrect credentials', async () => {
      const user = apiHelperUser.user()
      user.password = 'wrong password'
      const response = await api
        .post('/api/login')
        .send(user)
        .expect(401)
        .expect('Content-Type', /application\/json/)

      expect(response.body.error).toBeDefined()
      expect(response.body.error).toBe('invalid user or password')
    })

  })

  describe('user valid to create blogs', () => {

    test('validation user to created a new blog, token malformed', async () => {

      const newBlog = apiHelperUser.newBlog()

      const result = await api
        .post('/api/blogs')
        .send(newBlog)
        .set({ Authorization: 'Bearer undefined' })

      expect(result.status).toBe(400)
      expect(result.body.error).toBe('jwt malformed')
    })

    test('created a new blog with token invalid', async () => {
      const newBlog = apiHelperUser.newBlog()

      const result = await api
        .post('/api/blogs')
        .send(newBlog)
        .set({ Authorization: 'Bearer ' })

      expect(result.status).toBe(401)
      expect(result.body.error).toBe('token missing or invalid')
    })

    test('create new blog without token', async () => {
      const newBlog = apiHelperUser.newBlog()

      const result = await api
        .post('/api/blogs')
        .send(newBlog)

      expect(result.status).toBe(401)
      expect(result.body.error).toBe('token missing or invalid')
    })

    test('create blog with correct token', async () => {

      const newBlog = apiHelperUser.newBlog()

      const result = await api
        .post('/api/blogs')
        .send(newBlog)
        .set({ Authorization: `Bearer ${await getToken()}` })

      expect(result.status).toBe(201)
      expect(result.body.title).toBe(newBlog.title)
      expect(result.body.author).toBe(newBlog.author)
      expect(result.body.url).toBe(newBlog.url)
      expect(result.body.likes).toBe(newBlog.likes)
      expect(result.body.id).toBeDefined()

    })
  })

})

afterAll(() => {
  mongoose.connection.close()
})
