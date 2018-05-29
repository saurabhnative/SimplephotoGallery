/*
*Component to handle image uploads
*/
import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import './upload.css';
import ImagePreview from './components/imagepreview/imagepreview';
import UploadIcon from 'react-icons/lib/fa/cloud-upload';
class Upload extends Component {
  constructor() {
    super()
    this.state = {
       files: parseInt(localStorage.getItem('filesUploaded'),10) || 0,
       imgArray:[],
       selectedOption: '',
     }
  }
  /**
   * [Function to store images locally and generate image preview]
   * @param  {Object} acceptedFiles [Uploaded files object]
   */
  onDrop(acceptedFiles) {
    acceptedFiles.forEach((file,index) => {
        const reader = new FileReader();
        reader.onloadend=(e)=>{
            let fileName = "img"+this.state.files;
            localStorage.setItem(fileName,e.target.result)
            localStorage.setItem('filesUploaded',this.state.files+1)
            let imgArray=this.state.imgArray
            imgArray.push(
              <div className="img-container" key={file.name+index}>
                <ImagePreview file={file} index={this.state.files}/>
              </div>
            )
            this.setState({imgArray})
            this.setState({files:this.state.files+1})
        };
        reader.readAsDataURL(file);
      })
  }
  render() {
    return (
      <div className="App">
      <section>
        <div className="dropzone">
          <Dropzone
            accept="image/jpeg, image/png"
            onDrop={(files)=>this.onDrop(files)}
            style={dropzoneStyle}
            >
            <p className="select-text">
            Select images to upload
            <UploadIcon className="uploadIcon"/>
            </p>
          </Dropzone>
        </div>
        <div className="uploaded-img-container">
          {this.state.imgArray}
        </div>
      </section>
      </div>
    );
  }
}

const dropzoneStyle = {
  fontSize: '15px',
  textAlign: 'center',
  backgroundColor: '#eb1111',
  borderRadius: 11,
  fontFamily: 'Arial',
  color: '#ffffff',
  display: 'flex',
  justifyContent:'center',
  alignItems:'center',
  paddingTop: 16,
  paddingLeft: 10,
  paddingRight: 10,
  width:300
}


export default Upload;
