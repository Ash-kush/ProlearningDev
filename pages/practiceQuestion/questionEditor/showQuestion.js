import {useState} from 'react'
function ShowQuestion(props) {
    return (
        <div className='p-2'>
            <h2 className='bg-slate-200 text-bold p-2'>{props.title}</h2>
            <div className='mt-4'>
                <label className='text-zinc-600 font-bold'>Description</label>
                <div className="bg-slate-100 p-2 break-words" dangerouslySetInnerHTML={{ __html: props.Description}}  />
            </div>
            <div className='mt-4'>
                <label className='text-zinc-600 font-bold'>Examples</label>
                <div className="bg-slate-100 p-2 break-words" dangerouslySetInnerHTML={{ __html: props.Examples}}  />
            </div>
            <div className='mt-4'>
                <label className='text-zinc-600 font-bold'>Constraints</label>
                <div className="bg-slate-100 p-2 break-words" dangerouslySetInnerHTML={{ __html: props.Constraints}}  />
            </div>
        </div>
    )
}
export default ShowQuestion