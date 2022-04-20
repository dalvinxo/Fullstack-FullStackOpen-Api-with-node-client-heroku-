const newBlog = () => ({
  title: 'React patterns',
  author: 'Michael Chan',
  url: 'https://reactpatterns.com/',
  likes: 7,
})

//remember create password really hard XD
const user = () => ({
  username: 'SnakeGood',
  password: '123456'
})

const baseUrl = '/api/users'

const Helpers = {
  url: baseUrl,
  newBlog,
  user
}

module.exports = Helpers