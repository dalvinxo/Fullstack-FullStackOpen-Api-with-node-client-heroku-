import axios from 'axios'

const baseUrl = '/api/blogs'
let token = null


const setToken = (tokenUser) => {
  token = tokenUser
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const postBlog = (blog) => {
  const config = {
    headers: { Authorization: `bearer ${token}` }
  }
  const request = axios.post(baseUrl, blog, config)
  return request.then(response => response.data)
}

const putBlog = (blog) => {
  const config = {
    headers: { Authorization: `bearer ${token}` }
  }
  const request = axios.put(`${baseUrl}/${blog.id}`, blog, config)
  return request.then(response => response.data)
}

const deleteBlog = (blogId) => {
  const config = {
    headers: { Authorization: `bearer ${token}` }
  }
  const request = axios.delete(`${baseUrl}/${blogId}`, config)
  return request.then(response => response.data)
}


const serviceBlog = {
  setToken,
  getAll,
  postBlog,
  putBlog,
  deleteBlog
}

export default serviceBlog