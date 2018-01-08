import React from 'react';
import { Input, Menu, Segment, Container, Label } from 'semantic-ui-react';
import FilterButton from './FilterButton';
import AddBatchButton from './AddBatchButton';
import ChooseViewButton from './ChooseViewButton';

export default class MainActionButtons extends React.Component {
    render() {
        return (
            <Container style={{paddingTop: '1.5em', marginBottom: '3em'}}>
                <AddBatchButton />
                <ChooseViewButton />
                <FilterButton />
            </Container>
        )
    }
}
