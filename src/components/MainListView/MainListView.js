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
                            <Link to = {`batchdetails/${batch.key}`}>
                                <BatchListItem key={index} batch={batch} />
                            </Link>
                            )
                        })
                    }
                </List>
            </Container>
        )
    }
}

/*
POPRAWIĆ FORMATOWANIE PO WSTAWIENIU LINK TO!
 */