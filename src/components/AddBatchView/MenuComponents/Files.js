import React from 'react';
import { Image, Divider, Label, Segment } from 'semantic-ui-react'


export default class Files extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            file: '',
            imagePreviewUrl: ''
        }
    }

    handleUploadSuccess = (e) => {

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        };
        reader.readAsDataURL(file);

        this.props.onFileUpload(file);
    };


    render() {

        let {imagePreviewUrl} = this.state;
        let imagePreview = null;
        if (imagePreviewUrl) {
        imagePreview = (
            <Segment compact>
                <Label attached='top'>Podgląd</Label>
                <Image src={imagePreviewUrl} size="small" style={{margin: '2em, 0'}} bordered rounded alt="Podgląd zdjęcia"/>
            </Segment>
        );
        }

        return (
            <div>
                {imagePreview}
                <span>
                  <label htmlFor='img' className="ui icon button" >
                    <i className="upload icon"> </i>
                      Wybierz zdjęcie
                  </label>
                  <input type="file"
                         id='img'
                         accept="image/*"
                         disabled = {this.props.disabled}
                         style={{display: "none"}}
                         ref={input => {
                             this.fileInput = input;
                         }}
                         onChange={
                             this.handleUploadSuccess
                         }
                  />
                </span>
            </div>
        )
    }
}
