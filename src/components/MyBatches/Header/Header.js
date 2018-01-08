import React from 'react';
import { Input, Menu, Segment, Container, Item } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


// z oknem logowania Header będzie przyjmowało propsy z nazwą browaru
export default class Header extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            active: "Moje warki"
        }
    }

    handleItemClick = (e, { name }) => this.setState({ active: name });

    render() {
        const { active } = this.state;
        return (
            <div>
                <Menu fixed='top' size='massive' borderless inverted>
                    <Container>

                        <Link to={this.props.pathToGoBack}>
                            <Menu.Item header style={{paddingLeft: '0', marginRight: '2em', fontSize: '1.5em'}} onClick={() => { active !== "Moje warki" && this.setState({ active: "Moje warki" }) }}>PiwByPaw</Menu.Item>
                        </Link>

                        <Menu inverted secondary>
                            <Link to={`${this.props.pathToGoBack}`}>
                                <Menu.Item name="Moje warki" active={active === "Moje warki"} onClick={this.handleItemClick} />
                            </Link>
                            <Link to="/calculators">
                                <Menu.Item name="Kalkulatory" active={active === "Kalkulatory"} onClick={this.handleItemClick} />
                            </Link>
                        </Menu>

                        <Menu.Item position="right">Browar Smoleniak</Menu.Item>

                    </Container>
                </Menu>
            </div>
        )
    }
}
