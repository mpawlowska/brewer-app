import React from 'react';
import BatchCard from '../MainCardsView/BatchCard';
import DetailsMenu from './DetailsComponents/DetailsMenu';

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
            type: '',
            isImageInBase: '',
            imageUrl: ''
            // ingredients_ferm: '',
            // ingredients_yeast: '',
            // ingredients_hop: '',
            // ingredients_addons: ''
        }
    }

    componentWillMount() {
        // let {name, style, ibu, alcohol, density, date, srm, volume, type} = this.props.batch.details;
        this.setState({
            name: this.props.batch.details.name,
            style: this.props.batch.details.style,
            date: this.props.batch.details.date,
            volume: this.props.batch.details.volume,
            ibu: this.props.batch.details.ibu,
            srm: this.props.batch.details.srm,
            density: this.props.batch.details.density,
            alcohol: this.props.batch.details.alcohol,
            type: this.props.batch.details.type,
            isImageInBase: this.props.batch.details.hasImage,
        })
    }

    // na początek - do podglądu - ustawiam w state wartości jakie są w props.batch, która przyszła z bazy
    // componentWillMount() {
    //     let { name, style, ibu, alcohol, density, date, srm, volume, type } = this.props.batch.details;
    //     // let {fermenting_components : ingredients_ferm, yeast : ingredients_yeast, hops: ingredients_hop, addons : ingredients_addons } = this.props.batch.recipe;
    //
    //     this.setState({
    //         name: name,
    //         style: style,
    //         date: date,
    //         volume: volume,
    //         ibu: ibu,
    //         srm: srm,
    //         density: density,
    //         alcohol: alcohol,
    //         type: type,
    //         ingredients_ferm: ingredients_ferm,
    //         ingredients_yeast: ingredients_yeast,
    //         ingredients_hop: ingredients_hop,
    //         ingredients_addons: ingredients_addons
    //     })
    // }

    // jeśli user zmieni wartości inputów, zapisuję je w state i przekazuję do odpowiedniego renderowania w dziecku
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
                <BatchCard name={name} style={style} ibu={ibu} alcohol={alcohol} density={density} date={date} batchKey={this.props.batch.key} isImageInBase={this.state.isImageInBase} imageUrl={this.state.imageUrl}/>
                <DetailsMenu onDetailsChange={this.handleDetailsChange} onImageChange={this.handleImageChange} batch={this.props.batch} onImageAddToBase={this.handleImageAddToBase} pathToGoBack={this.props.pathToGoBack} />
            </div>

        )
    }
}
