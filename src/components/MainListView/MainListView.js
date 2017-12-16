import React from 'react';
import { List, Container } from 'semantic-ui-react';
import BatchListItem from './BatchListItem'


export default class MainListView extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.pathSave('/list')
    }

    render() {
        return(
            <Container>
                <List divided relaxed animated>
                    {this.props.batches.map((batch, index) => <BatchListItem key={index} batch={batch} /> )}
                </List>
            </Container>
        )
    }
}