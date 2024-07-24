// Separation of Concerns - Anecdote, AnecdoteList
// Anecdote is only for presentation
// AnecdoteList will contain the logic

import { useSelector, useDispatch } from 'react-redux'
import { createSelector } from 'reselect'
import { createVote } from '../reducers/anecdoteReducer'
import {
  createNewVoteNotification,
  createNewTimeoutId,
  clearTimeoutId,
  createClearNotification,
} from '../reducers/notificationReducer'

const Anecdote = ({ content, votes, handleClick }) => {
  return (
    <div>
      <div>{content}</div>
      <div>
        has {votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

// createSelector uses memoization to only call the transformation fn -- array.filter in this case -- if anecdotes or filter changes and not every time an action is dispatched
// This was the case for previous case when all the filtering was within useSelector - which would cause expensive rendering issues

// Fn to select anecdotes
const selectAnecdotes = (state) => state.anecdotes
// Fn to select filter
const selectFilter = (state) => state.filter

// createSelector to return a function that will apply memoization to return the filtered anecdotes
const selectFilteredAnecdotes = createSelector(
  // Only run the transformation fn if these two change
  [selectAnecdotes, selectFilter],
  // Transformation fn that takes in the field properties of the store
  (anecdotes, filter) =>
    anecdotes
      .filter((anecdote) => anecdote.content.toLowerCase().includes(filter))
      .sort((a, b) => b.votes - a.votes)
)

const AnecdoteList = () => {
  // useSelector which will run the memoization fn
  const anecdotes = useSelector(selectFilteredAnecdotes)
  const dispatch = useDispatch()

  const clickVote = (anecdote) => {
    dispatch(createVote(anecdote.id))
    dispatch(createNewVoteNotification(anecdote.content))

    dispatch(clearTimeoutId())
    const newTimeoutId = setTimeout(() => {
      dispatch(createClearNotification())
    }, 5000)
    dispatch(createNewTimeoutId(newTimeoutId))
  }

  return (
    <>
      {anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          content={anecdote.content}
          votes={anecdote.votes}
          handleClick={() => clickVote(anecdote)}
        />
      ))}
    </>
  )
}

export default AnecdoteList
