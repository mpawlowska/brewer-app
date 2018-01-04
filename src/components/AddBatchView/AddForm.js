import React from 'react';
import NewBatchCard from './NewBatchCard';
import AddMenu from './MenuComponents/AddMenu';

export default class AddForm extends React.Component {

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
            type: '',
            imageUrl: ''
        }
    }

    // tu można ograniczyć powyżej w state i w poniższej metodzie tylko do tych kluczy, które są istotne do przekazania do NewBatchCard
    handleDetailsChange = (name, value) => {
        this.setState({
            [name]: value
        })
    };

    handleImageChange = (imageUrl) => {
        this.setState({
            imageUrl: imageUrl
        })
    };

    render() {
        let { name, style, ibu, alcohol, density, date } = this.state;
        return (
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around', height: '90%', width: '90%'}}>
                <NewBatchCard name={name} style={style} ibu={ibu} alcohol={alcohol} density={density} date={date} imageUrl={this.state.imageUrl}/>
                <AddMenu onDetailsChange={this.handleDetailsChange} onImageChange={this.handleImageChange} pathToGoBack={this.props.pathToGoBack}/>
            </div>

        )
    }
}


