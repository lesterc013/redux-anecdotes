import { useDispatch } from 'react-redux'
import { createAnecdoteThunk } from '../reducers/anecdoteReducer'
import { setNotificationThunk } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleNewAnecdote = async (event) => {
    event.preventDefault()
    const newAnecdoteContent = event.target.newAnecdote.value
    dispatch(createAnecdoteThunk(newAnecdoteContent))
    dispatch(setNotificationThunk(`you added '${newAnecdoteContent}'`, 3))
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
