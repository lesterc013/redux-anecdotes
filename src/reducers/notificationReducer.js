import { createSlice } from '@reduxjs/toolkit'
// useSelector here to get the latest anecdote?

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    notification: '',
    timeoutId: null,
  },
  reducers: {
    createNewAnecdoteNotification(state, action) {
      const content = action.payload
      state.notification = `You added '${content}'`
    },
    createNewVoteNotification(state, action) {
      const content = action.payload
      state.notification = `You voted for '${content}'`
    },
    createNewTimeoutId(state, action) {
      const timeoutId = action.payload
      state.timeoutId = timeoutId
    },
    clearTimeoutId(state) {
      clearTimeout(state.timeoutId)
      state.timeoutId = null
    },
    createClearNotification(state) {
      state.notification = ''
    },
  },
})

export default notificationSlice.reducer
export const {
  createNewAnecdoteNotification,
  createNewVoteNotification,
  createNewTimeoutId,
  clearTimeoutId,
  createClearNotification,
} = notificationSlice.actions
