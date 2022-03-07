const Question = require('../models/pgquestion')
const Compile = require('../util/compiler')

exports.pg_compile_post = async(req, res) => {
    const {code, input, language} = req.body
    if(Array.isArray(input)) {  //if multiple input
    let ot = []
    for(inp of input) {
        const data = await Compile({code: code, input: inp.input, language: language})
        if(data.stderr)
            ot.push(data.stderr)
        else if(data.stdout)
            ot.push(data.stdout)
        else 
            ot.push("Enter a valid input")
    }
    res.send(ot)
    
    } else {
    const data =await Compile(req.body)
    if(data.stderr)
        res.send(data.stderr)
    else if(data.stdout)
        res.send(data.stdout)
    else 
        res.send("Enter a valid input")
    } 
}

exports.fetch_question_get = async(req, res) => {
    const result = await Question.find({}, 'title')
    if(result) {
    res.send(result)
    } else {
    res.send("")
    }
}

exports.fetch_by_title_post = async(req, res) => {
    const result = await Question.findOne({title : req.body.title})
    if(result) {
    res.send(result)
    } else {
    res.send("")
    }
}

exports.add_question_post = async(req, res) => {
    const {title, Description, Examples, Constraints, Testcases} = req.body
    const add = Question({
    title: title,
    Description: Description,
    Examples: Examples,
    Constraints: Constraints,
    Testcases: Testcases
    })
    try{
    await add.save().then(() => res.send("success"))
    }
    catch(error) {
    console.log(error)
    }
}

exports.edit_question_post = async(req, res) => {
    const {id, title, Description, Examples, Constraints, Testcases} = req.body
    try{
    await Question.updateOne({_id: id}, {title: title, Description: Description, Examples: Examples, Constraints: Constraints, Testcases: Testcases})
    res.send("success")
    }
    catch(error) {
    console.log(error)
    }
}
