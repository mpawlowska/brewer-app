import React from 'react';
import {
    Route,
    Switch
} from 'react-router-dom';
import { Input, Menu, Segment, Container } from 'semantic-ui-react'

export default class HeaderMenu extends React.Component {
    // w jakiej metodzie to umieścić?
    state = {
        activeItem: 'Moje warki'
    };

    handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    render() {
        const { activeItem } = this.state;
        return (
            <Menu inverted secondary>
                <Menu.Item as='a' name='Moje warki' active={activeItem === 'Moje warki'} onClick={this.handleItemClick} />
                <Menu.Item as='a' name='Kalkulatory' active={activeItem === 'Kalkulatory'} onClick={this.handleItemClick} />
            </Menu>
        )
    }
}