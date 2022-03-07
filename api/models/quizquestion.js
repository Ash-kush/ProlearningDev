const mongoose = require('mongoose')

const question = new mongoose.Schema({
    questions: [{
        question: String,
        option: [
            {
                answer: String, 
                isCorrect: {
                    type: Boolean,
                    default: false
                }
            }, 
        ]
    }]
})

const Quizquestion = mongoose.model('Quizquestion', question)

module.exports = Quizquestion
