export const createFilterAction = (filter) => {
  return {
    type: 'SET_FILTER',
    payload: filter.toLowerCase(),
  }
}

const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_FILTER': {
      return action.payload
    }
    default:
      return state
  }
}

export default filterReducer
