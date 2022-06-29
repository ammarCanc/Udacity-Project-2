const _saveQuestion = require('./_DATA');
const _saveQuestionAnswer = require('./_DATA');


describe('Save Question', () => {
    test('Saving a question with options "Live" and "Die"', () => {
        const question = {optionOne:'Live', optionTwo:'Die'}
        expect(_saveQuestion(question)).toBe('ssdsdsd')
    })
})