const listHelper = require('../utils/list_helperBlog')
const { listBlog } = require('../utils/list_blogsforTest')


const resultBlog = {
  title: 'Canonical string reduction',
  author: 'Edsger W. Dijkstra',
  likes: 12
}

describe('favorite blog', () => {
  test('favorite blogs to the list blog', () => {
    expect(listHelper.favoriteBlog(listBlog)).toEqual(resultBlog)
  })
})