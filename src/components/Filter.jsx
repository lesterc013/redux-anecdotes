import { createFilterAction } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const Filter = () => {
  const dispatch = useDispatch()
  return (
    <>
      filter
      <input
        type='text'
        name='filter'
        onChange={(event) => dispatch(createFilterAction(event.target.value))}
      />
    </>
  )
}

export default Filter
