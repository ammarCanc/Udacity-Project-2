import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
} from './_DATA.js'


export function saveQuestion(info) {
  return _saveQuestion(info)
}

export function getInitialdata() {
  return Promise.all([
    _getUsers(),
    _getQuestions(),
  ]).then(([users, questions]) => ({
    users,
    questions,
  }))
}

export function saveQuestionAnswer(info) {
  return _saveQuestionAnswer(info)
}
