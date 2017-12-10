import React from 'react';
import {
    Route,
    Switch
} from 'react-router-dom';
import { Button } from 'semantic-ui-react';


export default class AddBatchButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Button
                content='Dodaj warkę'
                icon='add square'
                labelPosition='right'
                color="green"
            />
        );
    }
}

