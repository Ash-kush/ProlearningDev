import { useState, useRef } from "react";
import axios from "axios";
import { Controlled as CodeMirror} from 'react-codemirror2'
import "codemirror/lib/codemirror.css"
import "codemirror/theme/mbo.css"
if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
require("codemirror/mode/python/python")
require("codemirror/mode/cmake/cmake")
require('codemirror/mode/clike/clike')
}

function ShowEditor({IO}) {
    const [cpp, setCpp] = useState('')
    const [java, setJava] = useState('')
    const [python, setPython] = useState('')
    const [output, setOutput] = useState('')
    const [input, setInput] = useState('')
    const [language, setLanguage] = useState('text/x-c++src')
    const [check, setCheck] = useState(false)
    const [cpl, setCpl] = useState(false)
    const [one, setOne] = useState()
    const [testcase, setTest] = useState()
    const inputOutput = IO
    const inputFile = useRef()

  const Run = async() => {
    setCpl(true)
    if(!check) {
      input = ""
    } 
    const op = await axios.post("/programming",{ code: file.value , input: input , language: language});
    setOutput(op.data)
    setCpl(false)
  }

  const Test = async() => {
    setCpl(true)
    const ts = await axios.post("/programming",{ code: file.value , input: inputOutput , language: language});
    setTest(ts.data)
    setCpl(false)
    }


  function handelChange(editor, data, value) {
    if(language == 'text/x-cython') {
      setPython(value)
    }
    else if (language == 'text/x-java') {
      setJava(value)
    }
    else {
      setCpp(value)
    }
  }

  const files = {
    "text/x-c++src": {
      value: cpp
    },
    "text/x-java": {
      value: java
    },
    "text/x-cython": {
      value: python
    },
  }
  function Changefile(e) {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
      if(language == 'text/x-cython') {
        setPython(e.target.result)
      }
      else if (language == 'text/x-java') {
        setJava(e.target.result)
      }
      else {
        setCpp(e.target.result)
      }
    }
    reader.readAsText(file);
  }
  const [fileName, setFileName] = useState("text/x-c++src");
  const file = files[fileName];

  return(
  <div className="p-2 bg-zinc-50 h-full">
    <div className="pl-1.5 py-2 border-2 bg-zinc-100">
      <label>Language  </label>
      <select
        className="border-2"
        value = {language}
        onChange = {(e) => {
          setLanguage(e.target.value)
          setFileName(e.target.value)
        }}
      >
        <option value = 'text/x-c++src'>C++</option>
        <option value = 'text/x-java'>Java</option>
        <option value = 'text/x-cython'>Python</option>
      </select>
    </div>
    
    <div>
      <CodeMirror
        onBeforeChange = {handelChange}
        value = {file.value}
        className='h-96'
        options = {{
            lineWrapping: true,
            theme: 'mbo',
            lint: true,
            mode: language,
            lineNumbers: true
        }}
      />
    </div>
    
    <div className="py-3">
    <input onChange={Changefile} className="hidden" type='file' ref={inputFile} />
      <button className="mt-2 bg-zinc-800 text-white py-2 px-5 hover:bg-zinc-400" onClick={() => inputFile.current.click()}>Open File</button>
      <button disabled={cpl} className="mt-2 bg-zinc-800 text-white py-2 px-5 mx-8 hover:bg-zinc-400 disabled:bg-zinc-400" onClick= {Test}>Submit</button>
      <button disabled={cpl} className="mt-2 bg-zinc-800 text-white py-2 px-5 mr-8 hover:bg-zinc-400 disabled:bg-zinc-400" onClick= {Run}>Run</button>
      <input type="checkbox" name="input" onChange={() => setCheck(!check)} />
      <label htmlFor="input">Custom Input</label>
    </div>

    <div>
      {check &&
      <div>
        <h3 className="text-zinc-600 p-1">Custom Input</h3>
        <textarea value={input} className="w-full p-2 border-2 border-zinc-300 outline-none resize-none" rows="5" cols="10" name="input" onChange={(e) => setInput(e.target.value)} ></textarea> 
      </div>
      }
    </div>

    <div>
    {output &&
    <div className="border-2 border-zinc-300 mt-5">
      <div className="p-2 border-b-2 border-zinc-300 flex justify-end bg-zinc-100">
        <button className="px-2 border-2 border-zinc-300 font-bold text-zinc-500 hover:bg-zinc-400" onClick={() => setOutput("")}>x</button>
      </div>
      <div className="p-3">
        <h3 className="text-zinc-500 p-1 font-bold">Ouput</h3>
        <textarea value={output} className="w-full p-2 border-2 border-zinc-300 outline-none resize-none bg-slate-100" rows="5" cols="10" name="output" disabled>{output}</textarea>
      </div>
    </div>
    }
    </div>

    <div>
    {testcase && 
        <div className="border-2 border-zinc-300 mt-5">
            <div className="p-2 border-b-2 border-zinc-300 flex justify-end bg-zinc-100">
                <button className="px-2 border-2 border-zinc-300 font-bold text-zinc-500 hover:bg-zinc-400" onClick={() => setTest()}>x</button>
            </div>
            <div className="grid grid-cols-6 border-2 border-zinc-300">
                <div className="col-span-2 border-r-2 border-zinc-300 p-2 bg-zinc-50">
                {inputOutput.map((data, i) => {return( 
                    <div key={i}>
                        { data.output == testcase[i] ?
                        <button className="bg-gray-50 hover:bg-white text-green-400 font-extrabold w-full p-2 bg-white border border-gray-200" onClick = {() => {setOne({...data,i}) }}>Test case {i + 1}</button>
                        :
                        <button className="bg-gray-50 hover:bg-white text-rose-400 font-extrabold w-full p-2 bg-white border border-gray-200" onClick = {() => {setOne({...data,i}) }}>Test case {i + 1}</button>
                        }
                        </div>
                )})}
                </div>
                { one &&
                <div className="col-span-4">
                    <div className="p-3">
                        <h3 className="text-zinc-500 p-1 font-bold">Input</h3>
                        <textarea value={one.input}  className="w-full p-2 border-2 border-zinc-300 outline-none resize-none bg-slate-100" rows="3" cols="10" name="output" disabled>{one.input}</textarea>
                    </div>
                    <div className="p-2">
                        <h3 className="text-zinc-500 p-1 font-bold">Expected Output</h3>
                        <textarea value={one.output} className="w-full p-2 border-2 border-zinc-300 outline-none resize-none bg-slate-100" rows="3" cols="10" name="output" disabled>{one.output}</textarea>
                    </div>
                    <div className="p-2">
                        <h3 className="text-zinc-500 p-1 font-bold">Your Output</h3>
                        <textarea value={testcase[one.i]} className="w-full p-2 border-2 border-zinc-300 outline-none resize-none bg-slate-100" rows="3" cols="10" name="output" disabled>{testcase[one.i]}</textarea>
                    </div>
                </div>
                }
            </div>
        </div>
        }
    </div>    
  </div>
  )
}


export default ShowEditor