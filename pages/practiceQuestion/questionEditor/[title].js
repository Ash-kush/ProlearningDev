import { useState, useEffect, useReducer } from "react"
import axios from 'axios'
import { useRouter } from 'next/router'
import ShowEditor from "./showEditor"
import ShowQuestion from "./showQuestion"

function QuestionEditor(props) {
    const [value, setValue] = useState()
    const router = useRouter()
    useEffect(async() => {
        try{
            const { title } = router.query
            const val = await axios.post('/programming/fetchByTitle',{title: title})
            setValue(val.data)
        }
        catch(error) {
            alert(error)
        }
    },[])
    return (
        <div className="border-2 border-zinc-500 flex flex-row h-screen fixed">
        {value &&
        <div className="flex">
            <div className="w-5/12 overflow-auto">
                <ShowQuestion 
                    title = {value.title}
                    Description = {value.Description}
                    Examples = {value.Examples}
                    Constraints = {value.Constraints}
                />
            </div>
            <div className="w-7/12 overflow-auto">
                <ShowEditor 
                    IO = {value.Testcases}
                />
            </div>
        </div>
        }
        </div>
    )
}
export default QuestionEditor