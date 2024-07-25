import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import anecdotesService from '../../services/anecdotesService'

export const initializeAnecdotes = createAsyncThunk(
  'anecdotes/initializeAnecdotes',
  async () => {
    const anecdotes = await anecdotesService.getAll()
    return anecdotes
  }
)

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
      const id = action.payload
      const anecdoteToUpdate = state.find((anecdote) => anecdote.id === id)
      const updated = {
        ...anecdoteToUpdate,
        votes: anecdoteToUpdate.votes + 1,
      }
      return state.anecdotes.map((anecdote) =>
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
