import React from 'react';
import { Menu, Segment, Form } from 'semantic-ui-react'


function handleFiles(files) {
    for (let i = 0; i < files.length; i++) {
        let file = files[i];

        console.log(file)

    }

    //     if (!file.type.startsWith('image/')){ continue }
    //
    //     var img = document.createElement("img");
    //     img.classList.add("obj");
    //     img.file = file;
    //     preview.appendChild(img); // Assuming that "preview" is the div output where the content will be displayed.
    //
    //     var reader = new FileReader();
    //     reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
    //     reader.readAsDataURL(file);
    // }
}

// -------------------

// class SimpleReactFileUpload extends React.Component {
//
//     constructor(props) {
//         super(props);
//         this.state ={
//             file:null
//         }
//         this.onFormSubmit = this.onFormSubmit.bind(this)
//         this.onChange = this.onChange.bind(this)
//         this.fileUpload = this.fileUpload.bind(this)
//     }
//     onFormSubmit(e){
//         e.preventDefault() // Stop form submit
//         this.fileUpload(this.state.file).then((response)=>{
//             console.log(response.data);
//         })
//     }
//     onChange(e) {
//         this.setState({file:e.target.files[0]})
//     }
//     fileUpload(file){
//         const url = 'http://example.com/file-upload';
//         const formData = new FormData();
//         formData.append('file',file)
//         const config = {
//             headers: {
//                 'content-type': 'multipart/form-data'
//             }
//         }
//         return  post(url, formData,config)
//     }
//
//     render() {
//         return (
//             <form onSubmit={this.onFormSubmit}>
//                 <h1>File Upload</h1>
//                 <input type="file" onChange={this.onChange} />
//                 <button type="submit">Upload</button>
//             </form>
//         )
//     }
// }

// -------------------
// class ProfilePage extends Component {
//     state = {
//         username: '',
//         avatar: '',
//         isUploading: false,
//         progress: 0,
//         avatarURL: ''
//     };
//     handleChangeUsername = (event) => this.setState({username: event.target.value});
//     handleUploadStart = () => this.setState({isUploading: true, progress: 0});
//     handleProgress = (progress) => this.setState({progress});
//     handleUploadError = (error) => {
//         this.setState({isUploading: false});
//         console.error(error);
//     }
//     handleUploadSuccess = (filename) => {
//         this.setState({avatar: filename, progress: 100, isUploading: false});
//         firebase.storage().ref('images').child(filename).getDownloadURL().then(url => this.setState({avatarURL: url}));
//     };
//     render() {
//         return (
//             <div>
//                 <form>
//                     <label>Username:</label>
//                     <input type="text" value={this.state.username} name="username" onChange={this.handleChangeUsername} />
//                     <label>Avatar:</label>
//                     {this.state.isUploading &&
//                     <p>Progress: {this.state.progress}</p>
//                     }
//                     {this.state.avatarURL &&
//                     <img src={this.state.avatarURL} />
//                     }
//                     <FileUploader
//                         accept="image/*"
//                         name="avatar"
//                         randomizeFilename
//                         storageRef={firebase.storage().ref('images')}
//                         onUploadStart={this.handleUploadStart}
//                         onUploadError={this.handleUploadError}
//                         onUploadSuccess={this.handleUploadSuccess}
//                         onProgress={this.handleProgress}
//                     />
//                 </form>
//             </div>
//         );
//     }
// }
// export default ProfilePage;
//
//
//
// export default SimpleReactFileUpload


class UploadButton extends React.Component {

    onUpload = (input) => {
        console.log('TYP', input.type);
        if (!input.type.startsWith('image/')){
            prompt('Wybrany plik nie jest zdjęciem. Wybierz inny plik')
        } else {
            this.props.onFileUpload(input);
        }
    };

    render() {
        console.log(this.props.text);
        return (
            <span>
              <label htmlFor='img' className="ui icon button" >
                <i className="upload icon"></i>
                  {this.props.text}
              </label>
              <input type="file" id='img'
                     disabled = {this.props.disabled}
                     style={{display: "none"}}
                     ref={input => {
                         this.fileInput = input;
                     }}
                     onChange={() => {
                         this.onUpload(this.fileInput.files[0]);
                     }}
              />
            </span>
        );
    }
}



export default class Files extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        console.log('Files render');
        return (
            <div>
                <UploadButton onFileUpload={this.props.onFileUpload} disabled={this.props.disabled} text={this.props.buttonText}/>
            </div>
        )
    }
}
