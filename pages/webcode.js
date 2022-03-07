import { useState, useEffect} from 'react'
import { Controlled as CodeMirror} from 'react-codemirror2'
import "codemirror/lib/codemirror.css"
import "codemirror/theme/material.css"
if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
require("codemirror/mode/xml/xml")
require("codemirror/mode/javascript/javascript")
require('codemirror/mode/css/css')
}

function Web() {
    const [html, setHtml] = useState('')
    const [css, setCss] = useState('')
    const [js, setJs] = useState('')
    const [srcDoc, setSrcDoc] = useState('')

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSrcDoc(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <title>Document</title>
                <style>
                ${css}
                </style>
            </head>
            <body>
                ${html}
        
                <script type="text/javascript">
                ${js}
                </script>
            </body>
            </html>
            `)
        }, 250)
    }, [html, css, js])

  function handelChange(editor, data, value) {
    if(file.name == "HTML") {
        setHtml(value)
    }
    else if(file.name == "CSS") {
        setCss(value)
    }
    else {
        setJs(value)
    }
  }

  const files = {
    "script.js": {
      name: "JS",
      language: "javascript",
      value: js
    },
    "style.css": {
      name: "CSS",
      language: "css",
      value: css
    },
    "index.html": {
      name: "HTML",
      language: "xml",
      value: html
    },
  }
  const [fileName, setFileName] = useState("index.html");
  const file = files[fileName];

  return(
  <div>
    <div className='flex bg-slate-900 text-[#fafafa] h-14 items-center'>
      <button className='px-4 disabled:text-gray-400' disabled={fileName === "index.html"} onClick={() => setFileName("index.html")}>HTML</button>
      <button className='px-4 disabled:text-gray-400' disabled={fileName === "style.css"} onClick={() => setFileName("style.css")}>CSS</button>
      <button className='px-4 disabled:text-gray-400' disabled={fileName === "script.js"} onClick={() => setFileName("script.js")}>JS</button> 
    </div>

    <div className= 'flex box-border border-4'>
      <div className='w-7/12'>
          <CodeMirror
              onBeforeChange = {handelChange}
              value = {file.value}
              className='h-screen'
              options = {{
                  lineWrapping: true,
                  theme: 'material',
                  lint: true,
                  mode: file.language,
                  lineNumbers: true
              }}
          />
      </div>

      <div className='h-screen w-full'>
          <iframe
              title = "output"
              srcDoc = {srcDoc}
              sandbox = "allow-scripts"
              frameBorder = "0"
              width = "100%"
              height = "100%"
          />
      </div>
    </div>
    
  </div>
  )
}


export default Web;