import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Container, Button, Popup } from 'semantic-ui-react';
import BatchCard from '../DetailsView/BatchCard';

class DeletePopup extends React.Component {
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
        return (
            <Popup
                trigger={<Button size='mini' content='Usuń'/>}
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
                    <Button color='red' content='Tak' onClick = {() => this.handleDelete(this.props.batchKey)}/>
                    <Button color='green' content='Nie' onClick={this.handleClose}/>
                </Popup.Content>
            </Popup>
        )
    }
}

export default class MainCardsView extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.pathSave('/cards')
    }

    render() {
        return(
            <Container>
                <Grid columns={5} stackable>
                    {this.props.batches.map((batch, index) => {
                        return (
                            <Grid.Column key={index}>
                                <Link to = {`batchdetails/${batch.key}`}>
                                    <BatchCard name={batch.details.name} style={batch.details.style} ibu={batch.details.ibu} alcohol={batch.details.alcohol} density={batch.details.density} date={batch.details.date} batchKey={batch.key} isImageInBase={batch.details.hasImage}/>
                                </Link>
                                <DeletePopup batchKey={batch.key}/>
                            </Grid.Column>
                            )
                        })
                    }
                </Grid>
            </Container>
        )
    }
}




