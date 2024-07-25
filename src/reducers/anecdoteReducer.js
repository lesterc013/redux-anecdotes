import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import anecdotesService from '../../services/anecdotesService'
import { createNewVoteNotification } from './notificationReducer'

// Using createAsyncThunk
export const initializeAnecdotes = createAsyncThunk(
  'anecdotes/initializeAnecdotes',
  async () => {
    const anecdotes = await anecdotesService.getAll()
    return anecdotes
  }
)

// Using traditional means
export const createAnecdoteThunk = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdotesService.postAnecdote(content)
    dispatch(createAnecdote(newAnecdote))
  }
}

export const voteThunk = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdotesService.upvote(anecdote)
    dispatch(createVote(updatedAnecdote))
    dispatch(createNewVoteNotification(updatedAnecdote.content))
  }
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: {
    status: 'idle',
    anecdotes: [],
    error: null,
  },
  reducers: {
    createAnecdote(state, action) {
      state.anecdotes.push(action.payload)
    },
    createVote(state, action) {
      const updated = action.payload
      const id = updated.id
      state.anecdotes = state.anecdotes.map((anecdote) =>
        anecdote.id !== id ? anecdote : updated
      )
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeAnecdotes.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(initializeAnecdotes.fulfilled, (state, action) => {
        state.status = 'success'
        state.anecdotes = action.payload
      })
      .addCase(initializeAnecdotes.rejected, (state, action) => {
        state.status = 'failure'
        state.error = action.error.message
      })
  },
})

export default anecdoteSlice.reducer
export const { createAnecdote, createVote, setAnecdotes } =
  anecdoteSlice.actions
