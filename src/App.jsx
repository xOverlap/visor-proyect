import { useState } from 'react'
import './App.scss'
import { UploadIcon } from '@primer/octicons-react'

function App() {
    const [archiveType, setArchiveType] = useState("")
    const [result, setResult] = useState("")
    const [selectedFile, setSelectedFile] = useState(null)

    const handleFileInputChange = (e) => {
        setSelectedFile(e.target.files[0])
    }
    const handleFileSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('file', selectedFile)
        console.log(formData)
    }

    const handleClick = () => {
        if (archiveType !== "") {
            setResult(archiveType)
        }
    }
    function extractExtention(archiveName) {
        const extention = archiveName.split(".");
        return extention[extention.length - 1];
    }

    function checkFileExtention(file) {
        if (file.name.endsWith('.pdf') || file.name.endsWith('.csv') || file.name.endsWith('.xsl') || file.name.endsWith('.doc') || file.name.endsWith('.docx')) {
            return true
        } else {
            return false
        }
    }
    return (
        <div className='App'>
            <form id='formButton' onSubmit={handleFileSubmit} className='py-2'>
                <label id='labelButton' htmlFor="fileInput" className="py-2 px-4 flex w-28 justify-center items-center bg-red-600 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md  rounded-lg mx-auto">
                    <span className='mr-2 transition'>
                        <UploadIcon size={24} id="uploadIcon"/>
                    </span>
                    Upload
                </label>
                <input type="file" id='fileInput' accept='.pdf, .csv, .xsl, .doc, .docx' onChange={handleFileInputChange} className="hidden"/>
            </form>

            {selectedFile && !checkFileExtention(selectedFile) && (
                <h2 className='py-2'>El archivo de extención {extractExtention(selectedFile.name)} no es valido</h2>
            )}

            {selectedFile && checkFileExtention(selectedFile) && (
                <div>
                    <h2 className='py-2'>Archivo seleccionado: {selectedFile.name}</h2>
                    <select id='archiveType' className="block px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm w-52 focus:outline-none focus:ring-primary-500 focus:border-primary-500 mx-auto my-2" name="animals" value={archiveType} onChange={(e) => setArchiveType(e.target.value)}>
                        <option value="">
                            Selecciona una opción
                        </option>
                        <option value="pdf">
                            PDF
                        </option>
                        <option value="csv">
                            CSV
                        </option>
                        <option value="html">
                            HTML
                        </option>
                        <option value="xls">
                            XLS
                        </option>
                    </select>
                    <button type='submit' onClick={handleClick} className='my-2'>Click Me</button>
                    <h1 id="result">{result}</h1>
                </div>
            )}

            {!selectedFile && (
                <h2 className='py-2'>No hay un archivo seleccionado</h2>
            )}
        </div>
    )
}

export default App
