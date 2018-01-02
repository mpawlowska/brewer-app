import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Grid, Container, Button, Popup } from 'semantic-ui-react';
import BatchCard from './BatchCard';

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
                trigger={<Button size='mini' icon='delete' content='Usuń'/>}
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



        // const batchesRef = firebase.database().ref();
        // let batches = [];
        //
        // batchesRef.on('value', snap => {
        //     snap.forEach((childSnapshot) => {
        //         batches.push(childSnapshot.val());
        //     })
        // });

        // this.state = {
        //     batches: batches
        // };
        //
        // console.log('BATChes from constr', this.state.batches);
    }



    // tym sposobem wyświetla się tylko jedna warka - dlaczego? ale wyswietla się od razu, bez koniecnzości klikania na 'Karty'

    // onDataChange = (snap) => {
    //     let batches = [];
    //
    //     snap.forEach(childSnap => batches.push(childSnap.val()));
    //
    //     this.setState({batches: batches})
    // };
    //
    // componentDidMount() {
    //     const batchesRef = firebase.database().ref();
    //     batchesRef.on('value', this.onDataChange);
    // }

    // componentWillMount() {
    //     const batchesRef = firebase.database().ref();
    //     let batches = [];
    //
    //         batchesRef.on('value', snap => {
    //             snap.forEach((childSnapshot) => {
    //                 batches.push(childSnapshot.val());
    //             })
    //         });
    //
    //         this.setState({batches: batches});
    //     }

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
                                    <BatchCard name={batch.details.name} style={batch.details.style} ibu={batch.details.ibu} alcohol={batch.details.alcohol} density={batch.details.density} date={batch.details.date} />
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




