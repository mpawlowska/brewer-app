import React from "react";
import BatchCard from "./BatchCard";
import BatchForm from "./BatchForm";

export default class BatchCardForm extends React.Component {

    constructor(props) {
        super(props);

        // w state dane potrzebne do wyświetlania BatchCard
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
        if(this.props.view === "preview") {
            const batchKey = this.props.batch.key;
            const { name, style, ibu, alcohol, density, date, hasImage } = this.props.batch.details;
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
        const { view, pathToGoBack, batch } = this.props;

        return (
            <div style={{display: "flex", alignItems: "center", justifyContent: "space-around", height: "90%", width: "90%"}}>
                <BatchCard batchKey={batchKey} name={name} style={style} ibu={ibu} alcohol={alcohol} density={density} date={date}  isImageInBase={isImageInBase} imageUrl={imageUrl} />
                <BatchForm batch={batch} pathToGoBack={pathToGoBack} view={view} onDetailsChange={this.handleDetailsChange} onImageChange={this.handleImageChange} onImageAddToBase={this.handleImageAddToBase} />
            </div>
        )
    }
}
