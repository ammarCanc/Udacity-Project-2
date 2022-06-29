import {
    RETRIEVE_USERS,
    ADD_QUESTION,
    ADD_ANSWER,
  } from '../actions/users'
  
  export default function users(state = {}, action) {
    switch(action.type) {
      case RETRIEVE_USERS :
        return {
          ...state,
          ...action.users
        }

      case ADD_QUESTION :
        return {
          ...state,
          [action.userID]: {
            ...state[action.userID],
            questions: state[action.userID].questions.concat([action.questionID])
          }
        }

      case ADD_ANSWER :
        return {
          ...state,
          [action.userID]: {
            ...state[action.userID],
            answers: { ...state[action.userID].answers, ...action.answer }
          }
        }
      default :
        return state
    }
  }
  