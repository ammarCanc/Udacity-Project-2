import {
    RETRIEVE_QUESTIONS,
    PUT_QUESTION,
    UPDATE_VOTES,
  } from '../actions/questions'
  
  export default function questions(state = {}, action) {
    switch(action.type) {
      case RETRIEVE_QUESTIONS:
        return {
          ...state,
          ...action.questions
        }
      case UPDATE_VOTES :
        console.log(action)
        return {
          ...state,
          [action.qID]: {
            ...state[action.qID],
            optionOne: action.option === 'optionOne'
              ? {
                  ...state[action.qID].optionOne,
                  votes: state[action.qID].optionOne.votes.concat([action.userID])
                }
              : state[action.qID].optionOne
            ,
            optionTwo: action.option === 'optionTwo'
              ? {
                  ...state[action.qID].optionTwo,
                  votes: state[action.qID].optionTwo.votes.concat([action.userID])
                }
              : state[action.qID].optionTwo
            ,
          }
        }
      case PUT_QUESTION :
        return {
          ...state,
          [action.question.id]: action.question
        }
      default :
        return state
    }
  }
  