import PropTypes from 'prop-types'

const Title = ({ title }) => {
  return (
    <>
      <h2><b>{title}</b></h2>
    </>
  )
}
Title.propTypes = {
  title: PropTypes.string.isRequired
}

export default Title