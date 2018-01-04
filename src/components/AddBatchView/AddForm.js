import React from 'react';
import NewBatchCard from './NewBatchCard';
import AddMenu from './MenuComponents/AddMenu';

export default class AddForm extends React.Component {

    constructor(props) {
        super(props);

    // w state dane potrzebne do wyświetlania NewBatchCard
        this.state = {
            isImageInBase: 'false',
            name: '',
            style: '',
            date: '',
            ibu: '',
            density: '',
            alcohol: '',
            imageUrl: ''
        }
    }

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

    handleImageAddToBase = () => {
        this.setState({
            isImageInBase: 'true'
        })
    };


    render() {
        let { name, style, ibu, alcohol, density, date } = this.state;
        return (
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around', height: '90%', width: '90%'}}>
                <NewBatchCard name={name} style={style} ibu={ibu} alcohol={alcohol} density={density} date={date} imageUrl={this.state.imageUrl} isImageinBase={this.state.isImageInBase}/>
                <AddMenu onDetailsChange={this.handleDetailsChange} onImageChange={this.handleImageChange} onImageAddToBase={this.handleImageAddToBase} pathToGoBack={this.props.pathToGoBack}/>
            </div>
        )
    }
}