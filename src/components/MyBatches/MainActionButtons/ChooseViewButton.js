import React from "react";
import { Link } from "react-router-dom";
import { Dropdown, Divider } from "semantic-ui-react";


export default class ChooseViewButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            active: "cards"
        }
    }

    onClick = (e, { name }) => {
        this.state.active == name ||
        this.setState({
            active: name
        })
    };

    render() {
        const { active } = this.state;
        const style = {width: "100px", color: "black", textAlign: "center"};

        return (
            <Dropdown text="Wybierz widok" open style={{float: "right"}}>
                <Dropdown.Menu>
                    <Link to="/mybatches/cards">
                        <Dropdown.Item style={style} active={active === "cards"} name="cards" onClick={this.onClick}>
                        Karty
                        </Dropdown.Item>
                    </Link>
                    <Divider />
                    <Link to="/mybatches/list">
                        <Dropdown.Item style={style} active={active === "list"} name="list" onClick={this.onClick}>
                        Lista
                        </Dropdown.Item>
                    </Link>
                </Dropdown.Menu>
            </Dropdown>
        );
    }
}