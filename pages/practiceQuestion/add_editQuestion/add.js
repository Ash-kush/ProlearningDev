import {useState} from 'react'
import TestcasesIO from './testcasesIO'
import TextEditor from './textEditor'
import axios from 'axios'
import { useRouter } from 'next/router'

function AddQuestion() {
    const [IOValues, setIOValues] = useState([{ input: "", output : ""}])
    const [questionInfo, setQuestionInfo] = useState({
        title: '',
        Description: '',
        Examples: '',
        Constraints: ''
      });
    const router = useRouter()

    const AddDetails = async() => {
        try{
            if(questionInfo.title == '') {
                alert("Required, Add title for question")
            }
            else if(questionInfo.Description < 20) {
                alert("Required, Add description minimum length 20 characters")
            }
            else if(questionInfo.Examples < 2) {
                alert("Required, Add atleast Example")
            }
            else if(questionInfo.Constraints < 10) {
                alert("Required, Add minimum required Constraints")
            }
            else if(IOValues.length < 2) {
                alert("Required, Add atleast 2 testcases")
            }
            else {
                const res = await axios.post('/programming/addQuestion', {
                    title: questionInfo.title,
                    Description: questionInfo.Description,
                    Examples: questionInfo.Examples,
                    Constraints: questionInfo.Constraints,
                    Testcases: IOValues
                })
                if(res.data == "success") {
                    router.push("/practiceQuestion")
                } else {
                    alert("Something went wrong " + res.data)
                }
            }
        }
        catch(error) {
            alert(error)
        }
    }

    return(
        <div className='px-10 py-5 bg-zinx-50'>
            <div>
                <label className='text-zinc-600 font-bold'>Question (Title)</label>
                <input value={questionInfo.title} onChange={(e) => setQuestionInfo({...questionInfo,title:e.target.value})} className='bg-zinc-100 w-full p-2' required />
            </div>
            <div className='mt-2'>
                <label className='text-zinc-600 font-bold'>Description</label>
                <TextEditor
                    name = 'Description'
                    value = {questionInfo}
                    onChange = {setQuestionInfo}
                />
            </div>
            <div className='mt-2'>
                <label className='text-zinc-600 font-bold'>Examples (Input, Output, Explanation)</label>
                <TextEditor
                    name = 'Examples'
                    value = {questionInfo}
                    onChange = {setQuestionInfo}
                />
            </div>
            <div className='mt-2'>
                <label className='text-zinc-600 font-bold'>Constraints</label>
                <TextEditor
                    name = 'Constraints'
                    value = {questionInfo}
                    onChange = {setQuestionInfo}
                />
            </div>
            <div className='mt-2'>
                <label className='text-zinc-600 font-bold'>Test Cases</label>
                <TestcasesIO
                    values={IOValues}
                    onChange={setIOValues}
                />
            </div>
            
            <div className='mt-4 flex justify-center'>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-400 text-white font-bold rounded-md" type="button" onClick={AddDetails} >Submit</button>
            </div>
           
        </div>
    )
}

export default AddQuestion