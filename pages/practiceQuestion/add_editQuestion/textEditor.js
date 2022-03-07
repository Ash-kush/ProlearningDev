const ReactQuill = typeof window === 'object' ? require('react-quill') : () => false
import {useState} from 'react'
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

function TextEditor(props) {
    const name = props.name
    const val = props.value
    const onChange = props.onChange
    var Change = (value) => {
        onChange({ ...val,
            [name]:value
          });
    }
    return(
        <div>
             <ReactQuill
                value={val[name]}
                onChange={Change}
                theme='snow'
                className='h-full'
                placeholder={"Write something awesome..."}
                modules={modules}
            />
        </div>
    )
}

export default TextEditor