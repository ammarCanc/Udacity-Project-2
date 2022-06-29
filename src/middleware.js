import thunk from 'redux-thunk'
import { applyMiddleware } from 'redux'

const logger = (store) => (next) => (action) => {
    console.group(action.type)
      const returnValue = next(action)
    console.groupEnd()
    return returnValue
}

export default applyMiddleware(
  thunk,
  logger,
)

