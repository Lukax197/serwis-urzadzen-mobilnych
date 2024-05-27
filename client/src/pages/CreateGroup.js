import Dropzone from "react-dropzone";
import xlsxParser from 'xlsx-parse-json'

const CreateGroup = ({createGroup}) =>
    <Dropzone onDrop={acceptedFiles => 
        xlsxParser
            .onFileSelection(acceptedFiles[0])
            .then(data => {
                console.log(data.Sheet1)
                data.Sheet1.map(d => d.groupName = acceptedFiles[0].name)
                createGroup()
            })}>
        {({getRootProps, getInputProps}) => (
            <section>
                <div {...getRootProps()}>
                    <input {...getInputProps()}/>
                    <div className="drop-zone"> 
                        Drop file here
                    </div>
                </div>
            </section>
        )}
    </Dropzone>

export default CreateGroup