import React from "react";
import BatchCard from "../MainCardsView/BatchCard";
import DetailsMenu from "./DetailsComponents/DetailsMenu";

export default class DetailsForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            batchKey: "",
            isImageInBase: "",
            name: "",
            style: "",
            date: "",
            ibu: "",
            density: "",
            alcohol: "",
            imageUrl: ""
        }
    }

    // ustawiam w state wartości jakie są w props.batch, która przyszła z bazy
    componentWillMount() {
        const batch = this.props.batch;
        const batchKey = this.props.batch.key;
        if(batch) {
            const {name, style, ibu, alcohol, density, date, hasImage} = batch.details;
            this.setState({
                batchKey,
                isImageInBase: hasImage,
                name,
                style,
                date,
                ibu,
                density,
                alcohol
            })
        }
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
            isImageInBase: "true"
        })
    };

    render() {
        const { batchKey, name, style, ibu, alcohol, density, date, isImageInBase, imageUrl } = this.state;
        return (
            <div style={{display: "flex", alignItems: "center", justifyContent: "space-around", height: "90%", width: "90%"}}>
                <BatchCard batchKey={batchKey} name={name} style={style} ibu={ibu} alcohol={alcohol} density={density} date={date}  isImageInBase={isImageInBase} imageUrl={imageUrl} />
                <DetailsMenu batch={this.props.batch} onDetailsChange={this.handleDetailsChange} onImageChange={this.handleImageChange} onImageAddToBase={this.handleImageAddToBase} pathToGoBack={this.props.pathToGoBack} disabled={this.props.disabled} view={this.props.view}/>
            </div>
        )
    }
}
