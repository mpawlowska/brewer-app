import React from 'react';
import {
    Route,
    Link
} from 'react-router-dom';
import { Dropdown, Divider } from 'semantic-ui-react';

const options = [
    { key: 1, text: 'Szczegóły', value: 'details' },
    { key: 2, text: 'Lista', value: 'list' },
];

export default class ChooseViewButton extends React.Component {
    constructor(props) {
        super(props);
    }

    //     this.state = {
    //         value: 'cards'
    //     }
    // }
    //
    // handleChange = (e, { value }) => {
    //     if (this.state.value != value) {
    //         this.setState({value});
    //     }
    // };

    render() {
        // const {value} = this.state;
        // console.log(this.state.value);

        return (
            <Dropdown text='Wybierz widok' open style={{float: 'right'}}>
                <Dropdown.Menu>
                    <Link to="/cards">
                        <Dropdown.Item style={{width: '100px', color: 'black'}}>
                        Karty
                        </Dropdown.Item>
                    </Link>
                    <Divider />
                    <Link to="/list">
                        <Dropdown.Item style={{width: '100px', color: 'black'}}>
                        Lista
                        </Dropdown.Item>
                    </Link>
                </Dropdown.Menu>
            </Dropdown>
        );
    }
}


// Pierwsza wersja Dropdown:
// <Dropdown text='Wybierz widok' options={options} open style={{float: 'right'}} onChange={this.handleChange} value={value}>

// const ChooseViewButton = () => (
//     <Button.Group size='mini'>
//         <Button>Szczegóły</Button>
//         <Button.Or text="lub"/>
//         <Button>Lista</Button>
//     </Button.Group>
// );
//
// export default ChooseViewButton;