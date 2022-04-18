const Anecdote = (props) => {
    const {anecdote, vote} = props
    return (
      <div>
        <h2>{anecdote.content} by {anecdote.author}</h2>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
        <div>
          for more info see <a href={anecdote.info} target='_blank' rel="noreferrer">{anecdote.info}</a>
        </div>
      </div>
    )
  }


  export default Anecdote