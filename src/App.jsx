import { useState, useEffect, useRef } from 'react'

import FormLogin from './components/FormLogin'
import ListBlog from './components/ListBlog'
import Title from './components/Title'
import Messages from './components/Messages'
import Toggable from './components/Toggable'
import FormBlog from './components/FormBlog'

import serviceBlog from './services/blogs'
import blogService from './services/blogs'
import Navbar from './components/Navbar'

const App = () => {

  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)


  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => sortBlogs(blogs))
  }, [])

  useEffect(() => {
    checkUserLogged()
  }, [])

  const sortBlogs = (blogs) => {
    const arrayBlogs = blogs.sort((a,b) => b.likes - a.likes)
    setBlogs(arrayBlogs)
  }

  const checkUserLogged = () => {

    const userLoggedLocal = localStorage.getItem('userLoggerInformation')

    if(userLoggedLocal)
    {
      const userRegistered = JSON.parse(userLoggedLocal)
      serviceBlog.setToken(userRegistered.token)
      setUser(userRegistered)
    }

  }

  const handleUpdateLike = async (blog) => {

    try {
      const response = await serviceBlog.putBlog(blog)
      const newListBlog = blogs.map(blog => blog.id === response.id ? response : blog)
      sortBlogs(newListBlog)

    } catch (exception) {

      const body = (exception.response.data | { error : 'error to the update blog' } )

      const response = {
        content : body.error,
        type: 'error' }

      setMessage(response)
    }

  }

  const handleDeleteBlog = async (blogId) => {

    try {
      await serviceBlog.deleteBlog(blogId)
      const newListBlog = blogs.filter(blog => blog.id !== blogId)
      sortBlogs(newListBlog)

    } catch (exception) {

      const body = (exception.response.data | { error : 'error to the update blog' } )

      const response = {
        content : body.error,
        type: 'error' }

      setMessage(response)
    }

  }


  const handlePostBlog = async (blog) => {

    try {

      const response = await serviceBlog.postBlog(blog)

      setBlogs(prev => prev.concat(response))

      setMessage({
        content: `a new blog ${response.title} by ${response.author}`,
        type: 'success'
      })

      blogFormRef.current.handleVisible()

      return true

    } catch (exception) {

      const body = exception.response.data

      const response = {
        content : body.error,
        type: 'error' }

      setMessage(response)

      return false
    }

  }


  return (
    <div>
      <Title title={user ?'Log in to aplication' :'Blogs'}/>

      {message && <Messages message={message} setMessage={setMessage}/>}

      {user === null
        ? <FormLogin setUser={setUser} setMessage={setMessage}/>
        : (<Navbar user={user} setUser={setUser}/>)
      }

      {user !== null && (
        <div>
          <Toggable labelButton='new blog' ref={blogFormRef}>
            <FormBlog createBlog={handlePostBlog} />
          </Toggable>
          <ListBlog
            blogs={blogs}
            handleUpdateLike={handleUpdateLike}
            handleDeleteBlog={handleDeleteBlog}
          />
        </div>
      )}

    </div>
  )
}

export default App
