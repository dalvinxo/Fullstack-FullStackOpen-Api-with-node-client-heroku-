import { useState } from 'react'
import serviceBlog from '../services/blogs'
import serviceLogin from '../services/login'

const FormLogin = (props) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const user = await serviceLogin.login({ username,password })

      localStorage.setItem('userLoggerInformation', JSON.stringify(user))
      props.setUser(user)
      serviceBlog.setToken(user.token)

      setUsername('')
      setPassword('')

    } catch (exception) {
      const body = exception.response.data

      const response = {
        content : body.error,
        type: 'error' }

      props.setMessage(response)
    }

  }

  return (
    <>
      <form onSubmit={handleSubmit}>

        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            onChange={({ target }) => setUsername(target.value)}
            name="username"
            value={username}
            id="username"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            onChange={({ target }) => setPassword(target.value)}
            name="password"
            value={password}
            id="password"
          />
        </div>

        <button type="submit" id="loginBlog">Login</button>

      </form>
    </>
  )
}

export default FormLogin