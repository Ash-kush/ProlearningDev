import {useState, useEffect} from 'react'
import TestcasesIO from './testcasesIO'
import TextEditor from './textEditor'
import axios from 'axios'
import { useRouter } from 'next/router'

function RemoveQuestion(props) {
    const router = useRouter()
    const [Value, setValue] = useState()
    const [IOValues, setIOValues] = useState()
    useEffect(async() => {
        try{
            const { editTitle } = router.query
            const val = await axios.post('/programming/fetchByTitle',{title: editTitle})
            setValue(val.data)
            setIOValues(val.data.Testcases)
        }
        catch(error) {
            alert(error)
        }
    },[])

    const EditDetails = async() => {
        try{
            if(Value.title == '') {
                alert("Required, Add title for question")
            }
            else if(Value.Description < 20) {
                alert("Required, Add description minimum length 20 characters")
            }
            else if(Value.Examples < 2) {
                alert("Required, Add atleast Example")
            }
            else if(Value.Constraints < 10) {
                alert("Required, Add minimum required Constraints")
            }
            else if(IOValues.length < 2) {
                alert("Required, Add atleast 2 testcases")
            }
            else {
                const res = await axios.post('/programming/editQuestion', {
                    id: Value._id,
                    title: Value.title,
                    Description: Value.Description,
                    Examples: Value.Examples,
                    Constraints: Value.Constraints,
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
        <div>
            { Value &&
            <div className='px-10 py-5 bg-zinx-50'>
                <div>
                    <label className='text-zinc-600 font-bold'>Question (Title)</label>
                    <input value={Value.title} onChange={(e) => setValue({...Value,title:e.target.value})} className='bg-zinc-100 w-full p-2' required />
                </div>
                <div className='mt-2'>
                    <label className='text-zinc-600 font-bold'>Description</label>
                    <TextEditor
                        name = 'Description'
                        value = {Value}
                        onChange = {setValue}
                    />
                </div>
                <div className='mt-2'>
                    <label className='text-zinc-600 font-bold'>Examples (Input, Output, Explanation)</label>
                    <TextEditor
                        name = 'Examples'
                        value = {Value}
                        onChange = {setValue}
                    />
                </div>
                <div className='mt-2'>
                    <label className='text-zinc-600 font-bold'>Constraints</label>
                    <TextEditor
                        name = 'Constraints'
                        value = {Value}
                        onChange = {setValue}
                    />
                </div>

                { IOValues &&
                <div className='mt-2'>
                    <label className='text-zinc-600 font-bold'>Test Cases</label>
                    <TestcasesIO
                        values={IOValues}
                        onChange={setIOValues}
                    />
                </div>
                }
                <div className='mt-4 flex justify-center'>
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-400 text-white font-bold rounded-md" type="button" onClick={EditDetails} >Submit</button>
                </div>
            
            </div>
            }
        </div>
    )
}

export default RemoveQuestion