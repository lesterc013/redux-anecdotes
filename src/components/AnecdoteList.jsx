// Separation of Concerns - Anecdote, AnecdoteList
// Anecdote is only for presentation
// AnecdoteList will contain the logic

import { useSelector, useDispatch } from 'react-redux'
import { createVoteAction } from '../reducers/anecdoteReducer'

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

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state).toSorted(
    (a, b) => b.votes - a.votes
  )
  const dispatch = useDispatch()

  return (
    <>
      {anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          content={anecdote.content}
          votes={anecdote.votes}
          handleClick={() => dispatch(createVoteAction(anecdote.id))}
        />
      ))}
    </>
  )
}

export default AnecdoteList
