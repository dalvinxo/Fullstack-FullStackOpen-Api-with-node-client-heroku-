const listHelper = require('../utils/list_helperBlog')
const { listBlog: AllBlog } = require('../utils/list_blogsforTest')

describe('most likes', () => {

  test('author with most like in the list', () => {
    expect(listHelper.mostLikes(AllBlog)).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
  })
})