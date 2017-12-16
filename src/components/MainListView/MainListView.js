import React from 'react';
import { Link } from 'react-router-dom';
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
                    {this.props.batches.map((batch, index) => {
                        return (
                            <BatchListItem key={index} batch={batch} />
                            )
                        })
                    }
                </List>
            </Container>
        )
    }
}

/*
wykrzaczało jak wstawiłam linki
 <Link to = {`batchdetails/${batch.id}`}>
 <BatchListItem key={index} batch={batch} />
 </Link>
 */