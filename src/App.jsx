import { useSelector, useDispatch } from 'react-redux'
import { createVoteAction } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'

const App = () => {
  const anecdotes = useSelector((state) => state).toSorted(
    (a, b) => b.votes - a.votes
  )

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
      <AnecdoteForm />
    </div>
  )
}

export default App
