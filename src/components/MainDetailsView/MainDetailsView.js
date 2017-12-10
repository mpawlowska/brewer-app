import React from 'react';
import { Grid, Container } from 'semantic-ui-react';
import BatchCard from './BatchCard';

// w propsach będzie przyjmował listę wszystkich warek z bazy

export default class MainDetailsView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
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