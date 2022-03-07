const mongoose = require('mongoose')

const question = new mongoose.Schema({
    title: String,
    Description: String,
    Examples: String,
    Constraints: String,
    Testcases: [{
    input: String,
    output: String
    }]
})
const pgQuestions = mongoose.model('pgQuestions', question)

module.exports = pgQuestions