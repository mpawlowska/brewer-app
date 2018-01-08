import React from 'react';
import { Dropdown } from 'semantic-ui-react';


// w propsach będzie dostawał liste stylów piwnych:
const stateOptions = [ { key: '1', value: 'Lager', text: 'Lager' }, {key: '2', value: 'IPA', text: 'IPA'} ];

export default class FilterButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchQuery: '',
            value: []
        }
    }

    handleChange = (e, {searchQuery, value}) => this.setState({searchQuery, value});

    handleSearchChange = (e, {searchQuery}) => this.setState({searchQuery});

    render() {
        const {searchQuery, value} = this.state;
        return (
            <Dropdown
                style={{display: 'block', width: '15em', marginTop: '1.5em'}}
                multiple
                onChange={this.handleChange}
                onSearchChange={this.handleSearchChange}
                options={stateOptions}  // to będzie do zmiany - będzie brało z listy stylów wpisanych przez użytkownika
                placeholder='Pokaż tylko wybrane style'
                search
                searchQuery={searchQuery}   // wartość wpisywanych danych przez usera
                selection
                value={value}   // wybrane wartości z listy
            >
            </Dropdown>
        )
    }
}




