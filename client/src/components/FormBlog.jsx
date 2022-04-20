import PropTypes from 'prop-types'
import { useState } from 'react'
import Title from './Title'

const initialBlog = {
  title: '',
  author: '',
  url: ''
}

const FormBlog = ({ createBlog }) => {

  const [blog, setBlog] = useState(initialBlog)

  const handleChange = e => {
    const { name, value } = e.target
    setBlog(prev => ({ ...prev, [name]:value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const success = await createBlog(blog)
    if(success) setBlog(initialBlog)
  }

  return (
    <div className='contentFormBlog'>
      <Title title='Create new'/>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            name="title"
            id="title"
            onChange={handleChange}
            placeholder="digit title"
            value={blog.title}
            data-testid="title"
          />
        </div>
        <div>
          <label htmlFor="author">Author</label>
          <input
            name="author"
            id="author"
            onChange={handleChange}
            placeholder="digit author"
            value={blog.author}
            data-testid="author"
          />
        </div>
        <div>
          <label htmlFor="url">Url</label>
          <input
            name="url"
            id="url"
            onChange={handleChange}
            placeholder="digit url"
            value={blog.url}
            data-testid="url"
          />
        </div>

        <button type="submit" id="createBlog">create</button>
      </form>
    </div>
  )
}


FormBlog.propsTypes = {
  createBlog: PropTypes.func.isRequired
}

export default FormBlog