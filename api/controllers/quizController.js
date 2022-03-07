const Quiz = require('../models/quizquestion')

exports.quiz_get = async (req, res) => {
    const data = await Quiz.find({})
    if(data)
        res.send(data)
    else
        res.send("Something went wrong")
}

exports.quiz_edit_add_post = async(req, res) => {
    try{
        const questions = req.body.questions
        const add = Quiz({
            questions: questions
        })
        await add.save()
        res.send("success")
    }
    catch(error) {
        console.log(error)
    }
}