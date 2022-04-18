import { useNavigate } from "react-router-dom"
import { useField } from '../hooks'

const FormAnecdote = (props) => {

    const Navigate = useNavigate()

    const content = useField('text')
    const author = useField('text')
    const info = useField('text')
  
    // const [content, setContent] = useState('')
    // const [author, setAuthor] = useState('')
    // const [info, setInfo] = useState('')
  
  
    const handleSubmit = (e) => {
      e.preventDefault()
      props.addNew({
        content,
        author,
        info,
        votes: 0
      })
  
      props.setNotification({message: `a new anecdote '${content}' created!`})
  
    //   setContent('')
    //   setAuthor('')
    //   setInfo('')
  
      Navigate('/')
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
          <button>create</button>
        </form>
      </div>
    )
  
  }


  export default FormAnecdote