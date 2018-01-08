import React from "react";
import { Link } from "react-router-dom";
import BatchCardForm from "./BatchCardForm";
import { Button, Icon, Popup } from "semantic-ui-react";


export default class DetailsView extends React.Component {
    constructor() {
        super();

        this.state = {
            batch: "",
            disabled: false,
            isOpen: false
        }
    }

    componentWillMount() {
        if(this.props.view === "preview") {
            const batches = this.props.batches;
            const batchKey = this.props.match.params.batchKey;
            const batch = batches.filter(batch => batch.key === batchKey);
            const batchObj = batch[0];
            this.setState({
                batch: batchObj,
                disabled: true
            })
        }
    }

    handleOpen = () => {
        this.setState({
            isOpen: true
        });
    };

    handleClose = (e) => {
        e.preventDefault();
        this.setState({
            isOpen: false
        });
    };

    handleDisabledChange = (isDisabled) => {
        this.setState({
            disabled: isDisabled
        })
    };

    render() {
        const { view, pathToGoBack } = this.props;
        const { batch, disabled, isOpen } = this.state;
        const exitButton =
            <Button icon circular style={{position: "absolute", top: "1em", right: "2em"}} >
                <Icon name="window close" />
            </Button>;

        return (
            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <div style={{height: "100vh", width:"100vw", backgroundColor: "#333333", opacity: "0.75", position: "fixed", left: "0", top: "0", zIndex: "998"}}>
                </div>
                <div style={{width:"90vw", backgroundColor: "white", zIndex: "999", opacity: "100", position: "absolute", top: "3em", display: "flex", alignItems: "center", justifyContent: "center", padding: "3em 0"}}>
                    <BatchCardForm view={view} batch={batch} pathToGoBack={pathToGoBack} handleDisabledChange={this.handleDisabledChange} />

                    {disabled ?
                        <Link to={pathToGoBack}>
                            {exitButton}
                        </Link>
                         :
                        <Popup
                            trigger={exitButton}
                            on="click"
                            position="top right"
                            flowing
                            open={isOpen}
                            onClose={this.handleClose}
                            onOpen={this.handleOpen}
                        >
                            <Popup.Header>
                                Czy chcesz wyjść bez zapisania zmian?
                            </Popup.Header>
                            <Popup.Content>
                                <Link to={pathToGoBack}>
                                    <Button color="grey" content="Tak" />
                                </Link>
                                <Button color="green" content="Nie" onClick={this.handleClose}/>
                            </Popup.Content>
                        </Popup>
                    }
                </div>
            </div>
        )
    }
};


// metoda, która powoduje powrót do poprzedniego path z history - tu nie moge jej wykorzystać, bo poprzednim path mogą być też inne zakładki z formularza dodawania, a muszę cofnąć do głównej strony
// goBack = () => {
//     this.props.history.goBack();
// };

// css info - aby zrobić non-opacity element na elemencie, który ma ustawione opacity, nie mogę umieścić tego elementu non-opacity jako dziecka, bo wtedy będzie zawsze "dziedziczyło" opacity. Wyrzucam więc ten element jako sąsiada elementu z opacity i odpowiednio go pozycjonuję;



