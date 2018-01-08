import React from "react";
import { Link } from "react-router-dom";
import { List, Container } from "semantic-ui-react";
import BatchListItem from "./BatchListItem"


export default class MainListView extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.pathSave("/mybatches/list");
    }

    render() {
        const { batches } = this.props;
        return(
            <Container>
                <List divided relaxed animated>
                    {batches.map((batch, index) => {
                        return (
                            <BatchListItem key={index} batch={batch} link={`/mybatches/batchdetails/${batch.key}`}/>
                            )
                        })
                    }
                </List>
            </Container>
        )
    }
}
