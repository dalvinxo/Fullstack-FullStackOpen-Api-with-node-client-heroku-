import PropTypes from 'prop-types'

const Navbar = (props) => {

  const handleOnClickLogout = () => {
    localStorage.removeItem('userLoggerInformation')
    props.setUser(null)
  }

  return (
    <div>
      {props.user.name} logged in <button onClick={handleOnClickLogout}>logout</button>
      <br/>
      <br/>
    </div>

  )
}

Navbar.propTypes = {
  user: PropTypes.object.isRequired
}

export default Navbar