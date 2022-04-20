const listHelper = require('../utils/list_helperBlog')
const { listBlog } = require('../utils/list_blogsforTest')

const resultAuthor = {
  author: 'Robert C. Martin',
  blogs: 3
}

describe('most blogs', () => {

  test('author with most count to blogs', () => {
    expect(listHelper.mostBlogs(listBlog)).toEqual(resultAuthor)
  })

})