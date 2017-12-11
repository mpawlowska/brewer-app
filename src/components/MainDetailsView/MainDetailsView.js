import React from 'react';
import { Grid, Container } from 'semantic-ui-react';
import BatchCard from './BatchCard';

// w state będzie przyjmował listę wszystkich warek z bazy

export default class MainDetailsView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            batches: []
        }
    }

    componentWillMount() {
        const batchesRef = firebase.database().ref().orderByKey();
        let batches = [];

            batchesRef.on('value', snap => {
                snap.forEach((childSnapshot) => {
                    batches.push(childSnapshot.val());
                })
            });
            this.setState({batches: batches});
        }

    render() {
        return(
            <Container>
            <Grid columns={5} stackable>
                {this.state.batches.map((batch, index) => {
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