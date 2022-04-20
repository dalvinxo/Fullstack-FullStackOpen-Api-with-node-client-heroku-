import Blog from './Blog'
import PropTypes from 'prop-types'

const ListBlog = ({ blogs, handleUpdateLike, handleDeleteBlog }) => {

  return (
    <>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleUpdateLike={handleUpdateLike} handleDeleteBlog={handleDeleteBlog}/>
      )}
    </>
  )
}


ListBlog.propTypes = {
  blogs: PropTypes.array.isRequired,
  handleDeleteBlog: PropTypes.func.isRequired,
  handleUpdateLike: PropTypes.func.isRequired
}

export default ListBlog