import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import {
  createNewAnecdoteNotification,
  createClearNotification,
  createNewTimeoutId,
  clearTimeoutId,
} from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleNewAnecdote = (event) => {
    event.preventDefault()
    const newAnecdote = event.target.newAnecdote.value
    dispatch(createAnecdote(newAnecdote))
    dispatch(clearTimeoutId())
    dispatch(createNewAnecdoteNotification(newAnecdote))
    const newTimeoutId = setTimeout(() => {
      dispatch(createClearNotification())
    }, 5000)
    dispatch(createNewTimeoutId(newTimeoutId))
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleNewAnecdote}>
        <div>
          <input name='newAnecdote' type='text' />
        </div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
