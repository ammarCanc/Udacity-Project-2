import { getInitialdata, saveQuestion, saveQuestionAnswer } from '../api'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { retrieveUsers, addUserQuestion, addAnswer } from './users'
import { retrieveQuestions, putQuestion, updateVotes } from './questions'

export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading())
    return getInitialdata()
      .then(({ users, questions}) => {
        dispatch(retrieveUsers(users))
        dispatch(retrieveQuestions(questions))
      })
      .then(() => dispatch(hideLoading()))
  }
}

export function handleNewQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {

    let { authUser } = getState()
    let qid = ''

    dispatch(showLoading())

    return saveQuestion({ // add in API/DATA first
      optionOneText,
      optionTwoText,
      author: authUser.id
    })
      .then((formattedQuestion) => {
        dispatch(putQuestion(formattedQuestion)) // add in Redux, questions object
        qid = formattedQuestion.id // gotta return so that next .then() can use it OR save as property
        return qid // gotta return so that next .then() can use it!
      })
      .then(() => dispatch(addUserQuestion(authUser.id, qid))) // add in Redux, users object
      .then(() => {
          dispatch(hideLoading())
          return qid
      })
  }
}

export function handleVoteAnswer(qid, option) {
  return (dispatch, getState) => {

    
    let { authUser } = getState()
    let answer = {[qid]: option }

    dispatch(showLoading())
    
    return saveQuestionAnswer({ // add vote to _DATA
      authedUser: authUser.id,
      qid,
      answer: option,
    })
      // Question Component will redirect to Answered by checking the user object for answers, so upload user object last!
      .then(() => dispatch(updateVotes(qid, option, authUser.id), console.log('sdsdsdssdddddddd'))) // add the vote to the questions' object
      .then(() => dispatch(addAnswer(authUser.id, answer), console.log('hehehe'))) // add this poll/the vote to the answers in the user's object
      .then(() => dispatch(hideLoading()))
  }
}
