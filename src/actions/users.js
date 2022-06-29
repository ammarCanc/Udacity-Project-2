export const RETRIEVE_USERS = 'RETRIEVE_USERS'
export const ADD_ANSWER = 'ADD_ANSWER'
export const ADD_QUESTION = 'ADD_QUESTION'

export function retrieveUsers(users) {
  return {
    type: RETRIEVE_USERS,
    users,
  }
}

export function addUserQuestion(userID, qID){
    return {
      type: ADD_QUESTION,
      userID,
      qID,
  }
}

export function addAnswer(userID, answer){
  return {
    type: ADD_ANSWER,
    userID,
    answer,
  }
}
