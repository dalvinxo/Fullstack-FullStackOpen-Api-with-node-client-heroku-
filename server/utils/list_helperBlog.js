const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const countLikes = blogs.reduce((accumulation, blog) => accumulation+blog['likes'],0)
  return countLikes
}

const favoriteBlog = (blogs) => {
  const favorite = blogs.reduce((accumulation, blog) => {
    const moreVote = blog.likes > accumulation.likes
    return (moreVote) ? blog : accumulation
  },{ likes:0 })

  delete favorite._id
  delete favorite.url
  delete favorite.__v

  return favorite
}

const mostBlogs = (blogs) => {
  const authorsBlogger =  _.countBy(blogs, blog => blog.author)
  const DictionaryAuthorWithCountBlog = Object.entries(authorsBlogger)
  const authorWithMore = _.maxBy(DictionaryAuthorWithCountBlog, ([name,numberBlog]) => numberBlog)

  const author = {
    author : authorWithMore[0],
    blogs: authorWithMore[1]
  }
  return author
}

const mostLikes = (blogs) => {
  const authorsLikes = blogs.reduce((accumulation, blog) => {
    const authorAlready = Object.prototype.hasOwnProperty.call(accumulation, blog.author)
    if(authorAlready){
      accumulation[blog.author] += (blog.likes | 0)
      return accumulation
    }

    accumulation[blog.author] = (blog.likes | 0)
    return accumulation
  },{})

  const maxLikes = Math.max(...Object.values(authorsLikes))

  const authorWithMoreLike = Object.entries(authorsLikes).filter(([keys, values]) => {
    return values === maxLikes
  })

  const [[author, likes]] = authorWithMoreLike

  const authorFavorite = {
    author,
    likes
  }

  return authorFavorite
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostLikes,
  mostBlogs
}