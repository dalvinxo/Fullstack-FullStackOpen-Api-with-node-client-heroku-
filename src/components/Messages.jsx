// import { useEffect } from 'react'

const container = {
  width: '100%',
  fontSize: '1.6rem',
  border: '5px solid',
  padding: '0.6rem 1rem',
  borderRadius: '0.7rem',
  background: 'lightgray',
  fontWeight: 600,
  margin: '1rem 0'
}

const Messages = ({ message : { content, type }/*, setMessage*/ }) => {


  // useEffect(() => {
  //   return cleanup()
  // })

  // const cleanup  = () => {
  //   setTimeout(() => {
  //     setMessage(null)
  //   }, 3000)
  // }

  if(!content){
    return null
  }

  const colorDesign = type === 'error' ? 'red' :'#1c941c'

  const color = { color: colorDesign,  borderColor: colorDesign }




  return (
    <div className='advertenceMessage' style={{ ...container, ...color }}>
      {content}
    </div>
  )
}

export default Messages