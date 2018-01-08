import React from 'react';
import { Button, Popup } from 'semantic-ui-react';


export default class DeleteBatchPopup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };
    }

    handleOpen = () => {
        this.setState({
            isOpen: true
        });
    };

    handleClose = () => {
        this.setState({
            isOpen: false
        });
    };

    handleDelete = (batchToDelete) => {
        const batchRef = firebase.database().ref(batchToDelete);
        batchRef.remove();
        this.handleClose();
    };

    render() {
        const { batchKey, trigger } = this.props;

        return (
            <Popup
                trigger={trigger}
                on='click'
                position='top right'
                flowing
                open={this.state.isOpen}
                onClose={this.handleClose}
                onOpen={this.handleOpen}
            >
                <Popup.Header>
                    Czy na pewno chcesz usunąć warkę?
                </Popup.Header>
                <Popup.Content>
                    <Button color='red' content='Tak' onClick = {() => this.handleDelete(batchKey)}/>
                    <Button color='green' content='Nie' onClick={this.handleClose}/>
                </Popup.Content>
            </Popup>
        )
    }
}
