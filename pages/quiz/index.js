import { useEffect, useState, useState } from 'react'
import axios from 'axios'

function Quiz() {
    const [questions, setQuestion] = useState()
    useEffect(async () => {
        const data = await axios.get('/quiz')
        setQuestion(data.data)
    })
    const [index, setIndex] = useState(0)
    const [score, setScore] = useState(0)
    const [finish, setFinish] = useState(false)

    function handleQuestion(i) {
        const Val = [...questions]
        if(Val[index]['option'][i]['isCorrect'] == true) {
            setScore(score + 1)
        }
        if(index + 1 < questions.length) {
            setIndex(index + 1)
        } else {
            setFinish(true)
        }
    }
    return  (
        <div className="flex bg-slate-700 min-h-screen p-10">
            {questions && finish ? 
            <div className='self-center w-full grid place-items-center'>
            <p className='text-center font-bold w-full text-white text-5xl'>Your Score {score} Out Of {questions.length}</p>
            <button className="px-4 py-2 bg-blue-600 text-white font-bold rounded-md">Finish</button>
            </div>
            :
            <div className='w-full'>
                 <p className='fontextra-bold text-center text-white text-6xl'>Question {index + 1}/{questions.length}</p>
                <h1 className='my-4 p-2 font-bold text-white text-5xl'>{ questions[index].question }</h1>
                {questions[index].option.map((data, i) => (
                    <button onClick={() => handleQuestion(i)} key={i} className='my-2 p-2 border-8 rounded-2xl w-full text-white hover:bg-slate-600 border-sky-600 text-2xl'>{ data.answer }</button>
                ))}
            </div>
            }
        </div>
    )
}

export default Quiz