import { useRef } from 'react'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import { urlencoded } from 'body-parser'

function Template({name, course, certificateid, date, inputRef}) {
    return(
        <div id="print" ref={inputRef} className="bg-gradient-to-r from-cyan-500 to-blue-500 font-mono h-full w-full text-center grid grid-cols-1 gap-4 content-center px-16 pb-10" >
            <div className="flex justify-center">
                <Icon />
                <h1 className="text-3xl p-8 font-extrabold text-white">ProLearning</h1>
            </div>
            <p className="font-bold text-slate-100 text-4xl">&nbsp;&nbsp;CERTIFICATE OF COMPLETION&nbsp;&nbsp;</p>
            <p className="text-slate-200 text-[15px]">This certificate is hereby awareded to</p>
            <p className="font-bold text-white text-4xl">{name}</p>
            <div className="mt-2 text-slate-300">
                <p className="m-2 text-[15px]">For successfully completing the {course}</p>
                <p className="m-2 text-[14px]">Issued on {date} by ProLearning</p>
                <p className="mt-8 text-[10px]">Certificate ID {certificateid}</p>
            </div>
        </div>
    )
}

const Icon = () => (
    <svg 
        className="w-20 h-28 bg-white" 
        fill="#fff" 
        stroke="#0379FF" 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
    >
    <path d="M12 14l9-5-9-5-9 5 9 5z"  />
    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    <path strokeLinecap="round" strokeLinejoin="round"  strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
    </svg>
)

export default Template