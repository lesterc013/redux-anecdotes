import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import {
  createNewAnecdoteNotification,
  createClearNotification,
  createNewTimeoutId,
  clearTimeoutId,
} from '../reducers/notificationReducer'
import anecdotesService from '../../services/anecdotesService'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleNewAnecdote = async (event) => {
    event.preventDefault()
    const newAnecdoteContent = event.target.newAnecdote.value
    const newAnecdote = await anecdotesService.postAnecdote(newAnecdoteContent)
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
