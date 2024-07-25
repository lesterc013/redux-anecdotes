import { useDispatch } from 'react-redux'
import { createAnecdoteThunk } from '../reducers/anecdoteReducer'
import {
  createNewAnecdoteNotification,
  createClearNotification,
  createNewTimeoutId,
  clearTimeoutId,
} from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleNewAnecdote = async (event) => {
    event.preventDefault()
    const newAnecdoteContent = event.target.newAnecdote.value
    // const newAnecdote = await anecdotesService.postAnecdote(newAnecdoteContent)
    // dispatch(createAnecdote(newAnecdote))
    dispatch(createAnecdoteThunk(newAnecdoteContent))
    dispatch(clearTimeoutId())
    dispatch(createNewAnecdoteNotification(newAnecdoteContent))
    const newTimeoutId = setTimeout(() => {
      dispatch(createClearNotification())
    }, 5000)
    dispatch(createNewTimeoutId(newTimeoutId))
    event.target.newAnecdote.value = ''
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
