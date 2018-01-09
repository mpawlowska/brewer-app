import React from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";


export const AddBatchButton = (props) => {

    return (
        <Link to="/mybatches/newbatch">
            <Button
                content="Dodaj warkę"
                icon="add square"
                labelPosition="right"
                color="green"
            />
        </Link>
    )
};

