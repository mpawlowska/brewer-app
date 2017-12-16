import React from 'react';
import { Grid, Container } from 'semantic-ui-react';
import BatchCard from './BatchCard';

// w state będzie przyjmował listę wszystkich warek z bazy

export default class MainDetailsView extends React.Component {
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

    render() {
        console.log('render MainDetailsView', this.props.batches);
        return(
            <Container>
            <Grid columns={5} stackable>
                {this.props.batches.map((batch, index) => {
                    return (
                        <Grid.Column key={index}>
                            <BatchCard key={index} batch={batch}/>
                        </Grid.Column>
                        )
                    })
                }
            </Grid>
            </Container>
        )
    }
}