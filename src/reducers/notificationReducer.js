import { createSlice } from '@reduxjs/toolkit'
// useSelector here to get the latest anecdote?

export const setNotificationThunk = (notification, time) => {
  return async (dispatch) => {
    dispatch(clearTimeoutId())
    dispatch(setNotification(notification))
    const newTimeoutId = setTimeout(() => {
      dispatch(clearNotification())
    }, time * 1000)

    // Set timeoutId..
    dispatch(setTimeoutId(newTimeoutId))
    // So we can clear it at the very beginning
  }
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    notification: '',
    timeoutId: null,
  },
  reducers: {
    setNotification(state, action) {
      state.notification = action.payload
    },
    clearNotification(state) {
      state.notification = ''
    },
    setTimeoutId(state, action) {
      state.timeoutId = action.payload
    },
    clearTimeoutId(state) {
      clearTimeout(state.timeoutId)
      state.timeoutId = null
    },
  },
})

export default notificationSlice.reducer
export const {
  setNotification,
  clearNotification,
  setTimeoutId,
  clearTimeoutId,
} = notificationSlice.actions
