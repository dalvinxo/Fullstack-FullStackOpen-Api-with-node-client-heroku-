import { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'

const Toggable = forwardRef((props, ref) => {

  const [visible, setVisible] = useState(false)

  const handleVisible = () => {
    setVisible(prev => !prev)
  }

  useImperativeHandle(ref, () => {
    return {
      handleVisible
    }
  })

  return (
    <div>
      {visible ?
        (
          <div>
            {props.children}
            <button onClick={handleVisible}>Cancel</button>
          </div>
        )
        :
        (
          <div>
            <button onClick={handleVisible}>{props.labelButton}</button>
          </div>
        )}

    </div>
  )
})

Toggable.displayName = 'Toggable'

Toggable.propTypes = {
  labelButton: PropTypes.string.isRequired
}

export default Toggable