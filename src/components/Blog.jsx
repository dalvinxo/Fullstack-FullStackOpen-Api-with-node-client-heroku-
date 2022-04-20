import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleUpdateLike, handleDeleteBlog }) => {

  const [visible, setVisible] = useState(false)

  const blogStyle = {
    padding: '10px 2px',
    border: 'solid',
    borderWidth: '.1rem',
    marginBottom: '.3rem',
    fontWeight: 600
  }

  const { author, title, url, likes, user, id } = blog

  const handleViewDetails = () => {
    setVisible(prev => !prev)
  }


  const UpdateBlog = () => {
    blog.likes += 1
    blog.user = blog.user.id

    handleUpdateLike(blog)
  }

  const DeleteBlog = () => {
    const Question = window.confirm(`Remove blog ${title} by ${author}`)

    if(Question){
      handleDeleteBlog(id)
    }

  }

  return (
    <div style={blogStyle} className="content-blog">
      <div>
        {title} {author}
        <button onClick={handleViewDetails} data-testid="showDetailsBlog">
          {visible ? 'hide' : 'view'}
        </button>
      </div>
      {visible && (
        <div>
          <div>{url}</div>
          <div id='likesBlogCount'>likes: {likes} <button onClick={UpdateBlog}>like</button> </div>
          <div>{user.name}</div>
          <button onClick={DeleteBlog}>delete</button>
        </div>
      )}
    </div>

  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleDeleteBlog: PropTypes.func.isRequired,
  handleUpdateLike: PropTypes.func.isRequired
}


export default Blog