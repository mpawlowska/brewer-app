import React from "react";
import { Link } from "react-router-dom";
import { Grid, Container, Button } from "semantic-ui-react";
import BatchCard from "../DetailsView/BatchCard";
import DeleteBatchPopup from "../MainActionButtons/DeleteBatchPopup";


export default class MainCardsView extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.pathSave("/mybatches/cards");
    }

    render() {
        const { batches } = this.props;
        const trigger = <Button size="mini" content="Usuń"/>;
        
        return(
            <Container>
                <Grid columns={5} stackable>
                    {batches.map((batch, index) => {
                        return (
                            <Grid.Column key={index}>
                                <Link to = {`/mybatches/batchdetails/${batch.key}`}>
                                    <BatchCard name={batch.details.name} style={batch.details.style} ibu={batch.details.ibu} alcohol={batch.details.alcohol} density={batch.details.density} date={batch.details.date} batchKey={batch.key} isImageInBase={batch.details.hasImage} />
                                </Link>
                                <DeleteBatchPopup batchKey={batch.key} trigger={trigger} />
                            </Grid.Column>
                            )
                        })
                    }
                </Grid>
            </Container>
        )
    }
}




