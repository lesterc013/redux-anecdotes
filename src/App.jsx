import { useSelector, useDispatch } from 'react-redux'
import { createVoteAction } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector((state) => state)
  const dispatch = useDispatch()

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
      <form>
        <div>
          <input />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App
