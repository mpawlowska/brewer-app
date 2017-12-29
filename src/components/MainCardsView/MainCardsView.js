import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Container, Button } from 'semantic-ui-react';
import BatchCard from './BatchCard';

// w state będzie przyjmował listę wszystkich warek z bazy

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

    handleDelete = (batchToDelete) => {
        const batchRef = firebase.database().ref(batchToDelete);
        batchRef.remove();
    };


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
                                <Button size='mini' icon='delete' content='Usuń' onClick = {() => this.handleDelete(batch.key)}

                                />
                            </Grid.Column>
                            )
                        })
                    }
                </Grid>
            </Container>
        )
    }
}




