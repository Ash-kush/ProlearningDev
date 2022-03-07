import { useState, useEffect, useRef } from 'react'
import Template from './certificateTemplate'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

function Certificate({name, course, certificateid, date}) {
    const inputRef = useRef(null)
    const [Fname, setFname] = useState(name)
    const pdf = new jsPDF({
        orientation: "landscape",
        unit: "in",
        format: [9, 6]
    })
    useEffect(() => {
        if(inputRef.current) {
            html2canvas(inputRef.current)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png')
                pdf.addImage(imgData, 'JPEG', 0, 0)
            })
        }
    }, [Fname])

    function Print() {
        pdf.save("download.pdf")
    }
    
    
    return(
        <div className='flex justify-center'>
        <div className='font-serif flex justify-start'>
            <div className='overflow-auto'>
                <div className='flex justify-start'>
                    <Icon />
                    <h1 className='text-5xl p-8 font-extrabold text-blue-500'>Certificate</h1>
                </div>
                <div className='pl-28'>
                    <p className='my-8'>Awareded to</p>
                    <input value={Fname} onChange={(e) => setFname(e.target.value)} className='text-5xl font-extrabold break-words text-blue-500' />
                    <p className='mt-8'>for completing</p>
                    <h1 className='text-4xl break-words text-blue-500 mt-4'>Course Name</h1>
                </div>
            </div>
            <div className='pl-8 mt-10'>
                <div className='h-full overflow-auto mb-4 border-4 border-black rounded-md'>
                    <Template 
                    name= {Fname}
                    course= {course}
                    certificateid= {certificateid}
                    date= {date}
                    inputRef = {inputRef}
                    />
                </div>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-400 text-white font-bold rounded-md" onClick={Print}>Download</button>
            </div>

        </div>
        </div>
    )
}

const Icon = () => (
    <svg 
        className="w-20 h-28 bg-blue-500" 
        fill="#0379FF" 
        stroke="#fff" 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
    >
    <path d="M12 14l9-5-9-5-9 5 9 5z"  />
    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    <path strokeLinecap="round" strokeLinejoin="round"  strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
    </svg>
)

Certificate.defaultProps = {
    name : 'Name Surname',
    course: 'Course Name',
    certificateid : 'doplrv94tn',
    date: new Date().toLocaleDateString()
}

export default Certificate