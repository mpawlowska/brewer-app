import React from "react";
import { Container } from "semantic-ui-react";
import FilterButton from "./FilterButton";
import { AddBatchButton } from "./AddBatchButton";
import ChooseViewButton from "./ChooseViewButton";

export const MainActionButtons = (props) => {
    
    return (
        <Container style={{paddingTop: "1.5em", marginBottom: "3em"}}>
            <AddBatchButton />
            <ChooseViewButton />
            <FilterButton />
        </Container>
    )
};
