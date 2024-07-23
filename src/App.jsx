import { useSelector, useDispatch } from 'react-redux'
import {
  createNewAnecdoteAction,
  createVoteAction,
} from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector((state) => state)
  const dispatch = useDispatch()

  const handleNewAnecdote = (event) => {
    event.preventDefault()
    const newAnecdote = event.target.newAnecdote.value
    dispatch(createNewAnecdoteAction(newAnecdote))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {/* Make list of anecdotes */}
      {anecdotes.map((anecdote) => (
        // Every anecdote has the content, and the votes
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            {/* Vote functionality */}
            <button onClick={() => dispatch(createVoteAction(anecdote.id))}>
              vote
            </button>
          </div>
        </div>
      ))}
      {/* Create new anecdote form */}
      <h2>create new</h2>
      <form onSubmit={handleNewAnecdote}>
        <div>
          <input name='newAnecdote' type='text' />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default App
