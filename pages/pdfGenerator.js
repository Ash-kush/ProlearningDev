const ReactQuill = typeof window === 'object' ? require('react-quill') : () => false
const { pdfExporter } = typeof window === 'object' ? require('quill-to-pdf') : () => false
import {useState} from 'react'
import { saveAs } from 'file-saver'
import 'react-quill/dist/quill.snow.css'

const  modules  = {
    toolbar: [
        [{ font: [] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ script:  "sub" }, { script:  "super" }],
        ["blockquote", "code-block"],
        [{ list:  "ordered" }, { list:  "bullet" }],
        [{ indent:  "-1" }, { indent:  "+1" }, { align: [] }],
        ["link", "image", "video"],
        ["clean"],
    ],
};

function PdfGenerator() {
    const [delta, setDelta] = useState()

    async function Create() {
        if(delta) {
            const pdfAsBlob = await pdfExporter.generatePdf(delta)
            saveAs(pdfAsBlob, 'document.pdf')
        } else {
            alert("Empty pdf is not created")
        }
    }
    function Change(content, delta, source, editor) {
        setDelta(editor.getContents())
    }
    return (
        <div className="px-10 py-5 bg-zinc-50">
            <div className='h-full'>
                <ReactQuill
                onChange={Change}
                theme='snow'
                className='h-full'
                placeholder={"Write something..."}
                modules={modules}
                />
            </div>
            <div className='mt-4 flex justify-center'>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-400 text-white font-bold rounded-md" type="button" onClick={Create} >Create</button>
            </div>
        </div>
    )
}

export default PdfGenerator