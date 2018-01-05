import React from "react";
import {
    Route,
    Switch,
    Link
} from "react-router-dom";
import { Menu, Segment, Form, Button, Popup, Divider } from "semantic-ui-react"
import Details from "../../AddBatchView/MenuComponents/Details";
import Recipe from "../../AddBatchView/MenuComponents/Recipe";
import Rating_Comments from "../../AddBatchView/MenuComponents/Rating_Comments";
import Files from "../../AddBatchView/MenuComponents/Files";

export default class DetailsMenu extends React.Component {
    constructor(props) {
        super(props);

        // mimo, że jest to podgląd, potrzebuję przechowywać stan ze wszystkich inputów, bo user może je edytować, po kliknięciu w button Edytuj
        this.state = {
            activeItem: "details",
            disabled: false,
            buttonText: "Edytuj",
            isPopupOpen: false,
            name: "",
            style: "",
            date: "",
            volume: "",
            ibu: "",
            srm: "",
            density: "",
            alcohol: "",
            type: "",
            ingredients_ferm: [],
            ingredients_yeast: [],
            ingredients_hop: [],
            ingredients_addons: [],
            rateGeneral: "",
            rateStyle: "",
            rateAroma: "",
            rateLook: "",
            rateFlavor: "",
            rateBitterness: "",
            commentGeneral: "",
            commentStyle: "",
            commentAroma: "",
            commentLook: "",
            commentFlavor : "",
            commentBitterness: "",
            commentAdditional: "",
            inputFile: "",
            imagePreviewUrl: "",    
            hasImage: "false"
        };
    }


    /* ------------------------------------------------ */
    //  // na początek - do podglądu - ustawiam w state wartości jakie są w props.batch, która przyszła z bazy
    componentWillMount() {
        if(this.props.batch) {

            let {fermenting_components : ingredients_ferm, yeast : ingredients_yeast, hop: ingredients_hop, addons : ingredients_addons} = this.props.batch.recipe;
            const {name, style, date, ibu, srm, alcohol, volume, density, type } = this.props.batch.details;
            const {rateGeneral, rateStyle, rateAroma, rateLook, rateFlavor, rateBitterness} = this.props.batch.rating;
            const {commentGeneral, commentStyle, commentAroma, commentLook, commentFlavor, commentBitterness,commentAdditional} = this.props.batch.comments;
            const {disabled} = this.props;

            // jeśli pobrane z bazy składniki są pustymi stringami, to zamieniam je na tablice, aby można je było wyświetlić poprzez metodę map
            if (!ingredients_ferm) {
                ingredients_ferm = [];
            }
            if (!ingredients_yeast) {
                ingredients_yeast = [];
            }
            if (!ingredients_hop) {
                ingredients_hop = [];
            }
            if (!ingredients_addons) {
                ingredients_addons = [];
            }

            this.setState({
                disabled: disabled,
                name: name,
                style: style,
                date: date,
                volume: volume,
                ibu: ibu,
                srm: srm,
                density: density,
                alcohol: alcohol,
                type: type,
                ingredients_ferm: ingredients_ferm,
                ingredients_yeast: ingredients_yeast,
                ingredients_hop: ingredients_hop,
                ingredients_addons: ingredients_addons,
                rateGeneral: rateGeneral,
                rateStyle: rateStyle,
                rateAroma: rateAroma,
                rateLook: rateLook,
                rateFlavor: rateFlavor,
                rateBitterness: rateBitterness,
                commentGeneral: commentGeneral,
                commentStyle: commentStyle,
                commentAroma: commentAroma,
                commentLook: commentLook,
                commentFlavor: commentFlavor,
                commentBitterness: commentBitterness,
                commentAdditional: commentAdditional
            });
        }
    }
    /* ------------------------------------------------ */

    // do zmiany aktywnej zakładki w Menu
    handleItemClick = (e, {name}) => {
        this.setState({
            activeItem: name
        })
    };

    /* ------------------------------------------------ */

    // do zamykania Popup usuwającego warkę
    togglePopup = () => {
        const currentPopupState = this.state.isPopupOpen;
        this.setState({
            isPopupOpen: !currentPopupState
        })
    };

    /* ---------------------OBSŁUGA DETAILS/PODSUMOWANIE--------------------------- */

    // do przechwytywania danych z inputów w Podsumowaniu
    handleDetailsComponentUpdate = (name, value) => {
        this.setState({
            [name]: value,
        });
        // przekazuję jeszcze wyżej bo potrzebuję do nowej batchCard - można to jakoś ograniczyć, aby wywoływało się tylko przy zmianie kilku określonych kluczy
        this.props.onDetailsChange(name, value);
    };

    /* ---------------------OBSŁUGA FILES/ZDJĘCIE--------------------------- */

    // zapisanie w state pliku
    onFileUpload = (image, imagePreviewUrl, hasImage) => {
        // najpierw przekazuję wyżej url, aby image mógł sie wyświetlić w BatchCard
        this.props.onImageChange(imagePreviewUrl);

        this.setState({
            inputFile: image,
            imagePreviewUrl: imagePreviewUrl,
            hasImage: hasImage
        });
    };

    /* --------------------OBSŁUGA RECIPE/RECEPTURA---------------------------- */

    // do przechwytywania danych z inputów w Recepturze - najpierw tworzę funkcje uniwersalne, które będą określały, który rodzaj składnika powinien być poddany zmianie
    chooseIngredients = (category) => {
        let ingredients;
        switch(category) {
            case "ingredients_ferm": {
                return ingredients = this.state.ingredients_ferm;
            }
            case "ingredients_yeast": {
                return ingredients = this.state.ingredients_yeast;
            }
            case "ingredients_hop": {
                return ingredients = this.state.ingredients_hop;
            }
            case "ingredients_addons": {
                return ingredients = this.state.ingredients_addons;
            }
            default: console.log("Nie znaleziono odpowiednich składników");
        }
    };

    updateIngredients = (category, newIngredients) => {
        switch(category) {
            case "ingredients_ferm": {
                this.setState({
                    ingredients_ferm: newIngredients
                });
                break;
            }
            case "ingredients_yeast": {
                this.setState({
                    ingredients_yeast: newIngredients
                });
                break;
            }
            case "ingredients_hop": {
                this.setState({
                    ingredients_hop: newIngredients
                });
                break;
            }
            case "ingredients_addons": {
                this.setState({
                    ingredients_addons: newIngredients
                });
                break;
            }
            default: console.log("Nie zapisały się składniki w state");
        }
    };

    handleRecipeComponentAddIngr = (category) => {
        const newIngredientObj = {name: "", quantity: ""};
        const ingredients = this.chooseIngredients(category);

        ingredients.push(newIngredientObj);

        this.updateIngredients(category, ingredients);
    };

    handleRecipeComponentUpdate = (e, ingredientIndex, category) => {
        let name = e.target.name;
        let value = e.target.value;

        const ingredients = this.chooseIngredients(category);

        ingredients[ingredientIndex][name] = value;

        this.updateIngredients(category, ingredients);
    };

    handleRecipeComponentDeleteIngr = (ingredientIndex, category) => {
        const ingredients = this.chooseIngredients(category);

        ingredients.splice(ingredientIndex, 1);

        this.updateIngredients(category, ingredients);
    };

    /* --------------------OBSŁUGA RATING_COMMENTS/Ocena i uwagi ---------------------------- */

    // do przechwytywania danych z inputów w Ocenie
    // ocena gwiazdkowa
    handleRateChange = (name, rate) => {
        this.setState({
            [name]: rate
        })
    };

    // komentarze
    handleCommentChange = (name, value) => {
        this.setState({
            [name]: value
        })
    };

    /* ------- OBSŁUGA BUTTONA "Zapisz i zakończ edycję" - dodanie nowej warki do bazy i pliku do storage ------ */

    onEditClick = (e) => {
        if (this.state.disabled) {
            e.preventDefault();  // to zapobiega uaktywnieniu Link z routera i przejściu na inną path
            this.setState({
                disabled: false,
                buttonText: "Zapisz i zakończ edycję"
            });
        } else {
            // tworzę referencję do konkretnej warki w bazie i nadpisuję jej dane
            const batchKey = this.props.batch.key;
            const batchRef = firebase.database().ref(batchKey);
            const { hasImage, name, style, date, ibu, srm, alcohol, volume, density, type, rateBitterness, rateStyle, rateAroma, rateLook, rateGeneral, rateFlavor, commentAroma, commentStyle, commentLook, commentGeneral, commentFlavor, commentAdditional, commentBitterness } = this.state;
            let ingredients_ferm, ingredients_yeast, ingredients_hop, ingredients_addons;

            // Ponieważ w Firebase nie zapisują się puste tablice, to w wypadku kiedy nia ma którychś składników dodanych w Recipe, to zamieniam pustą tablicę na pustego stringa, który zapisze się w Firebase.
            if (this.state.ingredients_ferm == false) {
                ingredients_ferm = "";
            } else {
                ingredients_ferm = this.state.ingredients_ferm;
            }
            if (this.state.ingredients_yeast == false) {
                ingredients_yeast = "";
            } else {
                ingredients_yeast = this.state.ingredients_yeast;
            }
            if (this.state.ingredients_hop == false) {
                ingredients_hop = "";
            } else {
                ingredients_hop = this.state.ingredients_hop;
            }
            if (this.state.ingredients_addons == false) {
                ingredients_addons = "";
            } else {
                ingredients_addons = this.state.ingredients_addons;
            }
            // tworzę nowe dane na podstawie state
            const newBatch = {
                "details": {
                    "hasImage": hasImage,
                    "name": name,
                    "style": style,
                    "date": date,
                    "volume": volume,
                    "ibu": ibu,
                    "srm": srm,
                    "density": density,
                    "alcohol": alcohol,
                    "type": type
                },
                "recipe": {
                    "fermenting_components": ingredients_ferm,
                    "hop": ingredients_hop,
                    "yeast": ingredients_yeast,
                    "addons": ingredients_addons
                },
                "rating": {
                    "rateGeneral": rateGeneral,
                    "rateStyle": rateStyle,
                    "rateAroma": rateAroma,
                    "rateLook": rateLook,
                    "rateFlavor": rateFlavor,
                    "rateBitterness": rateBitterness
                },
                "comments": {
                    "commentGeneral": commentGeneral,
                    "commentStyle": commentStyle,
                    "commentAroma": commentAroma,
                    "commentLook": commentLook,
                    "commentFlavor": commentFlavor,
                    "commentBitterness": commentBitterness,
                    "commentAdditional": commentAdditional
                }
            };

            // zapisuję do bazy
            batchRef.set(newBatch);

            /* ----------- dodanie pliku do storage -------------- */

            if(this.state.inputFile) {
                // tworzę storage reference
                const storageRef = firebase.storage().ref();

                // pobieram plik zapisany wcześniej w state
                let file = this.state.inputFile;

                // zapisuję plik w storage --> nazwa pliku to key warki
                file && storageRef.child(`images/${batchKey}`).put(file).then(function(snapshot) {
                    console.log("Uploaded file!");
                });

                this.props.onImageAddToBase();
            }
        }
    };

    /* ------------------------------------------------ */

    onDeleteBatchClick = (batchToDelete) => {
        const batchRef = firebase.database().ref(batchToDelete);
        batchRef.remove();
    };

    /* ----------- OBSŁUGA BUTTONA 'ZAKOŃCZ DODAWANIE WARKI' - dodanie nowej warki do bazy i pliku do storage -------------- */

    onCloseClick = () => {

        // tworzę referencję do bazy i potrzebne mi zmienne
        const batchesRef = firebase.database().ref();
        let {hasImage, name, style, date, ibu, srm, alcohol, volume, density, type, rateBitterness, rateStyle, rateAroma, rateLook, rateGeneral, rateFlavor, commentAroma, commentStyle, commentLook, commentGeneral, commentFlavor, commentAdditional, commentBitterness} = this.state;
        let ingredients_ferm, ingredients_yeast, ingredients_hop, ingredients_addons;

        // Ponieważ w Firebase nie zapisują się puste tablice, to w wypadku kiedy nia ma któryś składników dodanych w Recipe, to zamieniam pustą tablicę na pustego stringa, który zapisze się w Firebase.
        if (this.state.ingredients_ferm == false) {
            ingredients_ferm = '';
        } else {
            ingredients_ferm = this.state.ingredients_ferm;
        }
        if (this.state.ingredients_yeast == false) {
            ingredients_yeast = '';
        } else {
            ingredients_yeast = this.state.ingredients_yeast;
        }
        if (this.state.ingredients_hop == false) {
            ingredients_hop = '';
        } else {
            ingredients_hop = this.state.ingredients_hop;
        }
        if (this.state.ingredients_addons == false) {
            ingredients_addons = '';
        } else {
            ingredients_addons = this.state.ingredients_addons;
        }

        const newBatch = {
            "details": {
                "hasImage": hasImage,
                "name": name,
                "style": style,
                "date": date,
                "volume": volume,
                "ibu": ibu,
                "srm": srm,
                "density": density,
                "alcohol": alcohol,
                "type": type
            },
            "recipe": {
                "fermenting_components": ingredients_ferm,
                "hop": ingredients_hop,
                "yeast": ingredients_yeast,
                "addons": ingredients_addons
            },
            "rating": {
                "rateGeneral": rateGeneral,
                "rateStyle": rateStyle,
                "rateAroma": rateAroma,
                "rateLook": rateLook,
                "rateFlavor": rateFlavor,
                "rateBitterness": rateBitterness
            },
            "comments": {
                "commentGeneral": commentGeneral,
                "commentStyle": commentStyle,
                "commentAroma": commentAroma,
                "commentLook": commentLook,
                "commentFlavor": commentFlavor,
                "commentBitterness": commentBitterness,
                "commentAdditional": commentAdditional
            }

        };
        let newBatchKey = batchesRef.push(newBatch).key;

        // wrzucam warkę do bazy, ale też zapisuję klucz, bo będzie mi potrzebny do zapisania w storage zdjęcia pod odpowiednią nazwą


        /* ----------- dodanie pliku do storage -------------- */

        if (this.state.inputFile) {
            // tworzę storage reference
            const storageRef = firebase.storage().ref();

            // pobieram plik zapisany wcześniej w state
            let file = this.state.inputFile;

            // zapisuję plik w storage --> nazwa pliku to key warki
            file && storageRef.child(`images/${newBatchKey}`).put(file).then(function (snapshot) {
                console.log('Uploaded file!');
            });
            this.props.onImageAddToBase()
        }
    };

    /* --------------- RENDER ----------------------- */

    render() {

        let { activeItem, name, style, date, ibu, srm, alcohol, volume, density, type, ingredients_ferm, ingredients_yeast, ingredients_hop, ingredients_addons, disabled, rateGeneral, rateAroma, rateBitterness, rateflavor, rateLook, rateStyle, commentAdditional, commentAroma, commentBitterness, commentFlavor, commentGeneral, commentLook, commentStyle, buttonText, isPopupOpen }  = this.state;

        const { view } = this.props;
        let link, path, buttons;

        if(view === "add") {
            link = "/newbatch";
            path = "/newbatch";
            buttons = (
                <Link to={this.props.pathToGoBack}>
                    <Button type="submit" onClick={this.onCloseClick} color="blue" style={{position: "relative", left: "42em", marginTop: "0.5em"}}>Zakończ dodawanie warki</Button>
                </Link>
            )
        } else {
            link = `/batchdetails/${this.props.batch.key}`;
            path = "/batchdetails/:batchKey";
            const deleteBatchButton =
                <Button type="text" color="blue" style={{position: "relative", left: "45em", marginTop: "1em"}} onClick={this.togglePopup}>Usuń warkę</Button>;
            buttons = (
                <div>
                    <Link to={this.props.pathToGoBack}>
                        <Button type="text" color="blue" style={{position: "relative", left: "42em", marginTop: "1em"}} onClick={this.onEditClick}>{this.state.buttonText}</Button>
                    </Link>
                    <Popup
                        trigger={deleteBatchButton}
                        on="click"
                        position="top right"
                        flowing
                        open={this.state.isPopupOpen}
                    >
                        <Popup.Header>
                            Czy na pewno chcesz usunąć warkę?
                        </Popup.Header>
                        <Popup.Content>
                            <Link to={this.props.pathToGoBack}>
                                <Button color="blue" content="Tak" onClick = {() => this.onDeleteBatchClick(this.props.batch.key)}/>
                            </Link>
                            <Button color="green" content="Nie" onClick={this.togglePopup}/>
                        </Popup.Content>
                    </Popup>
                </div>
            )
        }

        return (
            <div style={{height: "100%", width: "75%"}}>
                <Menu attached="top" pointing secondary>
                    <Link to= {`${link}`}>
                        <Menu.Item name="details" active={activeItem === "details"} onClick={this.handleItemClick}>
                            Podsumowanie
                        </Menu.Item>
                    </Link>
                    <Link to= {`${link}/recipe`}>
                        <Menu.Item name="recipe" active={activeItem === "recipe"} onClick={this.handleItemClick}>
                            Receptura
                        </Menu.Item>
                    </Link>
                    <Link to={`${link}/rating-comments`}>
                        <Menu.Item name="rating-comments" active={activeItem === "rating-comments"} onClick={this.handleItemClick}>
                            Ocena i uwagi
                        </Menu.Item>
                    </Link>
                    <Link to={`${link}/files`}>
                        <Menu.Item name="files" active={activeItem === "files"} onClick={this.handleItemClick}>
                            Załączniki
                        </Menu.Item>
                    </Link>
                </Menu>
                <Segment attached="bottom">
                    <Form style={{position: "relative"}}>
                        <Switch>

                            /* -------- widok Podsumowania -------- */

                            <Route
                                exact path={path}
                                render={(routeProps) => (
                                    <Details {...routeProps} disabled={this.state.disabled} componentUpdate = {this.handleDetailsComponentUpdate} name={name} style={style} ibu={ibu} alcohol={alcohol} volume={volume} date={date} srm={srm} density={density} type={type}/>
                                )}
                            />

                            /* -------- widok Receptury -------- */

                            <Route
                                exact path={`${path}/recipe`}
                                render={(routeProps) => (
                                    <Recipe {...routeProps} disabled={this.state.disabled} componentUpdate = {this.handleRecipeComponentUpdate} ingredients_ferm={ingredients_ferm} ingredients_yeast={ingredients_yeast} ingredients_hop={ingredients_hop} ingredients_addons={ingredients_addons} componentAdd = {this.handleRecipeComponentAddIngr} componentDelete={this.handleRecipeComponentDeleteIngr}/>
                                )}
                            />

                            /* -------- widok Oceny i Komentarzy -------- */

                            <Route
                                exact path={`${path}/rating-comments`}
                                render={(routeProps) => (
                                    <Rating_Comments {...routeProps} disabled={disabled} handleRate={this.handleRateChange} rateGeneral={rateGeneral} rateAroma={rateAroma} rateBitterness={rateBitterness} rateflavor={rateflavor} rateLook={rateLook} rateStyle={rateStyle} commentBitterness={commentBitterness} commentAdditional={commentAdditional} commentFlavor={commentFlavor} commentLook={commentLook} commentStyle={commentStyle} commentAroma={commentAroma} commentGeneral={commentGeneral} handleCommentChange={this.handleCommentChange}/>
                                )}
                            />

                            /* -------- widok Załączników -------- */

                            <Route
                                exact path={`${path}/files`}
                                render={(routeProps) => (
                                    <Files {...routeProps} disabled={disabled} onFileUpload={this.onFileUpload} imagePreviewUrl={this.state.imagePreviewUrl}/>
                                    )}
                            />
                        </Switch>
                        <Divider> </Divider>
                        {buttons}
                    </Form>
                </Segment>
            </div>
        )
    }
};


// Ponieważ button submit w formularzu jest "owinięty" routerowym Linkiem, nie działa zdarzenie onSubmit ustawione dla Form. Aby warki zapisały się w bazie musiałam użyć zdarzenia onClick na tym buttonie - do poprawy