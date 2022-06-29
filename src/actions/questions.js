export const UPDATE_VOTES = 'UPDATE_VOTES'
export const RETRIEVE_QUESTIONS = 'RETRIEVE_QUESTIONS'
export const PUT_QUESTION = 'PUT_QUESTION'




export function retrieveQuestions(questions) {
  return {
    type: RETRIEVE_QUESTIONS,
    questions
  }
}

export function putQuestion(question) {
    return{
      type: PUT_QUESTION,
      question
  }
}

export function updateVotes(qID, option, userID) {
  return {
    type: UPDATE_VOTES,
    qID,
    option,
    userID,
  }
}
