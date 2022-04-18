import { useState } from 'react'
import { Route, Routes, useMatch } from 'react-router-dom'

import Anecdote from './components/Anecdote'
import AnecdoteList from './components/AnecdoteList'
import Menu from './components/Menu'
import About from './components/About'
import Footer from './components/Footer'
import Notification from './components/Notification'
import FormAnecdote from './components/FormAnecdote'

import { anecdotes as anecdotesExample } from './helpers/listHelpers'


const App = () => {
  const [anecdotes, setAnecdotes] = useState(anecdotesExample)

  const [notification, setNotification] = useState('')

  const match = useMatch('/anecdotes/:id')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const anecdote = match ? anecdoteById(Number(match.params.id)) : null;

  return (
    <div>
    
      
        <h1>Software anecdotes</h1>
        <Menu />
        <Notification notification={notification} setNotification={setNotification}/>
        <Routes>
          <Route path='/create' element={<FormAnecdote addNew={addNew} setNotification={setNotification}/>} />
          <Route path='/about' element={<About />} />
          <Route path='/anecdotes/:id' element={<Anecdote anecdote={anecdote} vote={vote} />} />
          <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />} />
        </Routes>

        <Footer />
    </div>
  )
}

export default App
