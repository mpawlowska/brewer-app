import React from 'react';
import BatchCard from '../MainCardsView/BatchCard';
import DetailsMenu from './DetailsMenu';

export default class DetailsForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            style: '',
            date: '',
            volume: '',
            ibu: '',
            srm: '',
            density: '',
            alcohol: '',
            type: ''
        }
    }

    // tu można ograniczyć powyżej w state i w poniższej metodzie tylko do tych kluczy, które są istotne do przekazania do NewBatchCard
    handleDetailsChange = (name, value) => {
        this.setState({
            [name]: value
        })
    };

    render() {
        let { name, style, ibu, alcohol, density, date } = this.props.batch;
        return (
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around', height: '90%', width: '90%'}}>
                <BatchCard batch={this.props.batch}/>
                <DetailsMenu onDetailsChange={this.handleDetailsChange} batch={this.props.batch}/>
            </div>

        )
    }
}
