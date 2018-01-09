import React from "react";
import { List, Container } from "semantic-ui-react";
import { BatchListItem } from "./BatchListItem";


export default class MainListView extends React.Component {

    componentDidMount() {
        this.props.pathSave("/mybatches/list");
    }

    render() {
        const { batches } = this.props;

        return(
            <Container>
                <List divided relaxed animated>
                    {batches.map((batch, index) => {
                        return <BatchListItem key={batch.key} batch={batch} link={`/mybatches/batchdetails/${batch.key}`} />
                        })
                    }
                </List>
            </Container>
        )
    }
}
