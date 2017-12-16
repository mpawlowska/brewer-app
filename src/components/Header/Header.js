import React from 'react';
import { Input, Menu, Segment, Container, Item } from 'semantic-ui-react';
import HeaderMenu from './HeaderMenu';
import { Link } from 'react-router-dom';

// z oknem logowania Header będzie przyjmowało propsy z nazwą browaru
export default class Header extends React.Component {
    // w jakiej metodzie to umieścić?
    state = {
        activeItem: 'Moje warki'
    };

    handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    render() {
        const {activeItem} = this.state;

        return (
            <div>
                <Menu fixed='top' size='massive' borderless inverted>
                    <Container>
                        <Link to={this.props.pathToGoBack}>
                            <Menu.Item header style={{paddingLeft: '0', marginRight: '2em', fontSize: '1.5em'}}>PiwByPaw</Menu.Item>
                        </Link>
                        <HeaderMenu />
                        <Menu.Item position="right">Browar Smoleniak</Menu.Item>
                    </Container>
                </Menu>
            </div>
        )
    }
}
