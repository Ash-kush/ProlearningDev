import axios from 'axios'
import {useEffect, useState} from 'react'
import Link from 'next/link'

function QuestionTitle() {
    const [questionData, setData] = useState()
    useEffect(async() => {
        try{
            const val = await axios.get('/programming/fetchQuestion')
            setData(val.data)
        }
        catch(error) {
            alert(error)
        }
    }, [])
    return(
        <div className='p-2'>
            {questionData 
            ? questionData.map((data, i) => { return(
                <div className='' key= {i}>
                <Link href={{pathname: '/practiceQuestion/questionEditor/[title]',query: { title: data.title },}} >
                    <a>
                    <div className='mt-2 p-2 bg-green-100 rounded-md hover:bg-green-200 flex justify-start'>
                        <h3 className='w-full pt-2'>{data.title}</h3>
                        <Link href={{pathname: '/practiceQuestion/add_editQuestion/[editTitle]',query: { editTitle: data.title },}} >
                            <button className="px-4 py-2 bg-green-600 hover:bg-green-400 text-white font-bold rounded-md" type="button">Edit</button>
                        </Link>
                    </div>
                    </a>
                </Link>
                </div>
            )})
            : <div className='px-4 py-4 text-zinc-400 text-center'>Question is not available</div>
            }
            <div className="mt-2 flex justify-center">
                <Link href="/practiceQuestion/add_editQuestion/add">
                    <button className="px-4 py-2 bg-green-600 text-white font-bold rounded-md" type="button">Add</button>
                </Link>
            </div>
        </div>
    )
}

export default QuestionTitle