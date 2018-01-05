import React from 'react';
import { Image, Label, Segment, Button } from 'semantic-ui-react'

// wybrane przez usera zdjecie przekazywane jest metodami z Files do rodzica - DetailsMenu i tam trzymane w state
// zdjęcie przekazywane jest do renderowania w Files w propsach od DetailsMenu;

export default class Files extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            buttonText: 'Wybierz zdjęcie',
        }
    }

    handleUploadSuccess = (e) => {
        let reader = new FileReader();
        let file = e.target.files[0];
        let imageUrl = null;

        reader.onloadend = () => {
            imageUrl = reader.result;
            this.setState({
                buttonText: 'Wybierz nowe zdjęcie',
            });
            this.props.onFileUpload(file, imageUrl, "true");
        };
        reader.readAsDataURL(file);
    };


    onCancel = () => {
        this.setState({
            buttonText: 'Wybierz zdjęcie'
        });
        this.props.onFileUpload(null, null);
    };

    render() {
        let {imagePreviewUrl} = this.props;
        let imagePreview = null;
        let cancelButton = null;
        if (imagePreviewUrl) {
            imagePreview = (
                <Segment compact>
                    <Label attached='top'>Podgląd</Label>
                    <Image src={imagePreviewUrl} size="small" style={{margin: '2em, 0'}} bordered rounded alt="Podgląd zdjęcia"/>
                </Segment>
            );
            cancelButton = <Button onClick={this.onCancel}>Anuluj</Button>
        }

        return (
            <div>
                {imagePreview}
                <span>
                  <label htmlFor='img' className="semantic ui button">
                    <i className="upload icon"> </i>
                      {this.props.disabled ? 'Kliknij Edytuj, aby wybrać zdjęcie': this.state.buttonText}
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
                    {cancelButton}
                </span>
            </div>
        )
    }
}
