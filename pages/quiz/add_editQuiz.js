import { useState } from 'react'
import axios from 'axios'

function EditQuiz( { questions } ) {
    const [ value, setValue] = useState(questions)
    const [index, setIndex] = useState(0)

    function Add() {
        const newVal = [...value]
        newVal[index]['option'] = [...newVal[index].option, {answer:'Answer', isCorrect: false}]
        setValue(newVal)
    }

    function handleQues(e) {
        const Ques = [...value]
        Ques[index]['question'] = e.target.value
        setValue(Ques)
    }

    function handleAns(e, i) {
        const Val = [...value]
        Val[index]['option'][i]['answer'] = e.target.value
        setValue(Val)
    }

    function handleR(i, e) {
        const Val = [...value]
        Val[index]['option'][i]['isCorrect'] = e.target.checked
        setValue(Val)
    }

    function removeAns(i) {
        const Val = [...value]
        Val[index]['option'].splice(i,1)
        setValue(Val)
    }

    function deleteQues() {
        const Val = [...value]
        Val.splice(index,1)
        setValue(Val)
        setIndex(index - 1)
    }

    function New() {
        if(index + 1 == value.length) {
            setValue([...value, {
                question: "Question",
                option: [
                    {answer:"Answer 1", isCorrect: false}, 
                    {answer:'Answer 2', isCorrect: false}, 
                ]
            }])
        }
        setIndex(index + 1)
    }

    async function Submit() {
        console.log(value)
        const data = await axios.post('/quiz/add_edit', {questions:value})
        alert(data.data)
    }

    return (
        <div className="bg-slate-700 min-h-screen p-10">
                <p className='fontextra-bold text-center text-white text-6xl'>Question {index + 1}/{value.length}</p>
            <div>
                <div className='my-4 flex justify-start'>
                    <input onChange={handleQues} className='p-2 bg-slate-700 hover:bg-slate-600 w-full font-bold text-white text-5xl' value={ value[index].question } />
                    <button onClick={deleteQues} disabled={index == 0 ? true : false} className="my-4 px-4 py-2 bg-red-600 disabled:bg-red-800 text-white font-bold rounded-md">Delete</button>
                </div>
                {value[index].option.map((data, i) => (
                    <div key={i} className='my-2 p-2 border-8 rounded-2xl w-full bg-slate-700 hover:bg-slate-600 border-sky-600 flex justify-start'>
                        <input onChange={e => handleR(i, e)} className='self-center h-6 w-6 mr-4' type="checkbox" checked={data.isCorrect} />
                        <input  onChange={e => handleAns(e,i)}  className='w-full bg-slate-700 text-white text-2xl' value={data.answer} />
                        <button onClick={() => removeAns(i)}>
                            <svg className="w-8 h-8 self-center mx-4" fill="red" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </button>
                    </div>
                ))}
                <div className='grid mt-2'>
                    <button onClick={Add} className="mr-4 px-4 py-2 bg-red-600 text-white font-bold rounded-md justify-self-end">Add</button>
                </div>
            </div>
            <div className="mt-24 grid grid-cols-3 gap-3">
                <button className="px-4 py-2 bg-green-600 text-white font-bold disabled:bg-green-800 rounded-md" disabled={index == 0 ? true : false} onClick={()=> setIndex(index - 1)}>Prev</button>
                <button className="px-4 py-2 bg-blue-600 text-white font-bold rounded-md" onClick={Submit}>Submit</button>
                <button className="px-4 py-2 bg-green-600 text-white font-bold rounded-md" onClick={New}>{index + 1 == value.length ? "New" : "Next"}</button>
            </div>
        </div>
    )
}

EditQuiz.defaultProps = {
    questions: [{
        question: "Question",
        option: [
            {answer:"Answer 1", isCorrect: false}, 
            {answer:'Answer 2', isCorrect: false}, 
        ]
    }]
}

export default EditQuiz