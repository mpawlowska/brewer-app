import React from "react";
import { Button, Popup } from "semantic-ui-react";


export default class DeleteBatchPopup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };
    }

    onOpen = () => {
        this.setState({
            isOpen: true
        });
    };

    onClose = () => {
        this.setState({
            isOpen: false
        });
    };

    onDelete = (batchToDelete) => {
        const batchRef = firebase.database().ref(batchToDelete);
        batchRef.remove();

        this.handleClose();
    };

    render() {
        const { batchKey, trigger } = this.props;
        const { isOpen } = this.state;

        return (
            <Popup
                trigger={trigger}
                on="click"
                position="top right"
                flowing
                open={isOpen}
                onClose={this.onClose}
                onOpen={this.onOpen}
            >
                <Popup.Header>
                    Czy na pewno chcesz usunąć warkę?
                </Popup.Header>
                <Popup.Content>
                    <Button color="red" content="Tak" onClick = {() => this.onDelete(batchKey)}/>
                    <Button color="green" content="Nie" onClick={this.onClose}/>
                </Popup.Content>
            </Popup>
        )
    }
}