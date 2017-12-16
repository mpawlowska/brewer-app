import React from 'react';
import {
    Link
} from 'react-router-dom';
import { Button } from 'semantic-ui-react';


export default class AddBatchButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Link to= 'newbatch'>
            <Button
                content='Dodaj warkę'
                icon='add square'
                labelPosition='right'
                color="green"
            />
            </Link>
        );
    }
}

