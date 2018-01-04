import React from 'react';
import BatchCard from '../MainCardsView/BatchCard';
import DetailsMenu from './DetailsComponents/DetailsMenu';

export default class DetailsForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isImageInBase: '',
            name: '',
            style: '',
            date: '',
            ibu: '',
            density: '',
            alcohol: '',
            imageUrl: ''
        }
    }

    // ustawiam w state wartości jakie są w props.batch, która przyszła z bazy
    componentWillMount() {
        let {name, style, ibu, alcohol, density, date, hasImage} = this.props.batch.details;
        this.setState({
            isImageInBase: hasImage,
            name: name,
            style: style,
            date: date,
            ibu: ibu,
            density: density,
            alcohol: alcohol
        })
    }

    // jeśli user zmieni wartości inputów i/lub zdjęcie, zapisuję je w state i przekazuję propsami do odpowiedniego renderowania BatchCard
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
        let { name, style, ibu, alcohol, density, date, isImageInBase, imageUrl } = this.state;
        return (
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around', height: '90%', width: '90%'}}>
                <BatchCard name={name} style={style} ibu={ibu} alcohol={alcohol} density={density} date={date} batchKey={this.props.batch.key} isImageInBase={isImageInBase} imageUrl={imageUrl}/>
                <DetailsMenu onDetailsChange={this.handleDetailsChange} onImageChange={this.handleImageChange} batch={this.props.batch} onImageAddToBase={this.handleImageAddToBase} pathToGoBack={this.props.pathToGoBack} />
            </div>
        )
    }
}
