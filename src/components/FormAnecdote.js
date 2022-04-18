import { useNavigate } from "react-router-dom"
import { useField } from '../hooks'

const FormAnecdote = (props) => {

    const Navigate = useNavigate()

    const { reset: contentReset, ...content} = useField('text')
    const { reset: authorReset, ...author} = useField('text')
    const { reset: infoReset, ...info} = useField('text') 
  
    const handleSubmit = (e) => {
      e.preventDefault()

      const newAnecdote = {
        content: content.value,
        author: author.value,
        info: info.value,
        vote: 0
      }

      props.addNew(newAnecdote)
  
      props.setNotification({message: `a new anecdote '${content}' created!`})
  
      handleResetForm()
  
      Navigate('/')
    }

    const handleResetForm = () => {
      contentReset()
      authorReset()
      infoReset()
    }
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input 
                name='content' 
                {...content}    
            />
          </div>
          <div>
            author
            <input 
                name='author'
                {...author}
            />
          </div>
          <div>
            url for more info
            <input 
                name='info'
                {...info}
            />
          </div>
          <button type="submit">create</button>
          <button type="reset" onClick={handleResetForm}>reset</button>
        </form>
      </div>
    )
  
  }


  export default FormAnecdote