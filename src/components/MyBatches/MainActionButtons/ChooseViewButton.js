import React from "react";
import { Link } from "react-router-dom";
import { Dropdown, Divider } from "semantic-ui-react";

const options = [
    { key: 1, text: "Szczegóły", value: "details" },
    { key: 2, text: "Lista", value: "list" },
];

export default class ChooseViewButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            active: "cards"
        }
    }

    onClick = (e, { name }) => {
        this.state.active == name || this.setState({
            active: name
        })
    };

    render() {
        const { active } = this.state;

        return (
            <Dropdown text="Wybierz widok" open style={{float: "right"}}>
                <Dropdown.Menu>
                    <Link to="/mybatches/cards">
                        <Dropdown.Item style={{width: "100px", color: "black", textAlign: "center"}} active={active === "cards"} name="cards" onClick={this.onClick}>
                        Karty
                        </Dropdown.Item>
                    </Link>
                    <Divider />
                    <Link to="/mybatches/list">
                        <Dropdown.Item style={{width: "100px", color: "black", textAlign: "center"}} active={active === "list"} name="list" onClick={this.onClick}>
                        Lista
                        </Dropdown.Item>
                    </Link>
                </Dropdown.Menu>
            </Dropdown>
        );
    }
}


// Pierwsza wersja Dropdown:
// <Dropdown text="Wybierz widok" options={options} open style={{float: "right"}} onChange={this.handleChange} value={value}>

// const ChooseViewButton = () => (
//     <Button.Group size="mini">
//         <Button>Szczegóły</Button>
//         <Button.Or text="lub"/>
//         <Button>Lista</Button>
//     </Button.Group>
// );
//
// export default ChooseViewButton;