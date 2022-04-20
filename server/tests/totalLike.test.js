  const listHelper = require('../utils/list_helperBlog')
const { listBlog:listWithALotsBlog } = require('../utils/list_blogsforTest')

describe('total likes', () => {

  test('list blog is a array', () => {
    expect(Array.isArray(listWithALotsBlog)).toBe(true)
  })

  test('list is not empty', () => {
    expect(listWithALotsBlog.length > 0).toBe(true)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithALotsBlog)
    expect(result).toBe(36)
  })
})