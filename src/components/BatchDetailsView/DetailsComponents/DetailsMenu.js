import React from 'react';
import {
    Route,
    Switch,
    Link
} from 'react-router-dom';
import { Menu, Segment, Form, Button, Popup, Divider } from 'semantic-ui-react'
import Details from '../../AddBatchView/MenuComponents/Details';
import Recipe from '../../AddBatchView/MenuComponents/Recipe';
import Rating_Comments from '../../AddBatchView/MenuComponents/Rating_Comments';
import Files from '../../AddBatchView/MenuComponents/Files';


export default class DetailsMenu extends React.Component {
    constructor(props) {
        super(props);

        // mimo, że jest to podgląd, potrzebuję przechowywać stan ze wszystkich inputów, bo user może je edytować, po kliknięciu w button Edytuj
        this.state = {
            activeItem: 'details',
            buttonText: 'Edytuj',
            disabled: true,
            isPopupOpen: false,
            name: '',
            style: '',
            date: '',
            volume: '',
            ibu: '',
            srm: '',
            density: '',
            alcohol: '',
            type: '',
            ingredients_ferm: '',
            ingredients_yeast: '',
            ingredients_hop: '',
            ingredients_addons: '',
            inputFile: '',
            imagePreviewUrl: ''
        };
    }
    /* ------------------------------------------------ */
    //  // na początek - do podglądu - ustawiam w state wartości jakie są w props.batch, która przyszła z bazy
    componentWillMount() {

        let {fermenting_components : ingredients_ferm, yeast : ingredients_yeast, hop: ingredients_hop, addons : ingredients_addons } = this.props.batch.recipe;
        let {name, style, date, ibu, srm, alcohol, volume, density, type} = this.props.batch.details;

        // jeśli pobrane z bazy składniki są pustymi stringami, to zamieniam je na tablicę, aby można je było wyświetlić poprzez metodę map
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
            ingredients_addons: ingredients_addons
        });
    }
    /* ------------------------------------------------ */

    // do zmiany aktywnej zakładki w Menu
    handleItemClick = (e, {name}) => {
        this.setState({
            activeItem: name
        })
    };

    /* ------------------------------------------------ */

    // do zamykania Popup
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

    onFileUpload = (image, imagePreviewUrl) => {
        this.props.onImageChange(imagePreviewUrl);
        this.setState({
            inputFile: image,
            imagePreviewUrl: imagePreviewUrl
        });

    };


    /* --------------------OBSŁUGA RECIPE/RECEPTURA---------------------------- */

    // do przechwytywania danych z inputów w Recepturze - najpierw tworzę funkcje uniwersalne, które będą określały, który rodzaj składnika powinien być poddany zmianie
    chooseIngredients = (category) => {
        let ingredients;
        switch(category){
            case 'ingredients_ferm': {
                return ingredients = this.state.ingredients_ferm;
            }
            case 'ingredients_yeast': {
                return ingredients = this.state.ingredients_yeast;
            }
            case 'ingredients_hop': {
                return ingredients = this.state.ingredients_hop;
            }
            case 'ingredients_addons': {
                return ingredients = this.state.ingredients_addons;
            }
            default: console.log('nie znaleziono odpowiednich ingredients');
        }
    };

    updateIngredients = (category, newIngredients) => {
        switch(category){
            case 'ingredients_ferm': {
                this.setState({
                    ingredients_ferm: newIngredients
                });
                break;
            }
            case 'ingredients_yeast': {
                this.setState({
                    ingredients_yeast: newIngredients
                });
                break;
            }
            case 'ingredients_hop': {
                this.setState({
                    ingredients_hop: newIngredients
                });
                break;
            }
            case 'ingredients_addons': {
                this.setState({
                    ingredients_addons: newIngredients
                });
                break;
            }
            default: console.log('nie zapisały się ingredients w state AddMenu');
        }
    };

    handleRecipeComponentAddIngr = (category) => {
        const newIngredientObj = {name: '', quantity: ''};
        let ingredients = this.chooseIngredients(category);

        ingredients.push(newIngredientObj);

        this.updateIngredients(category, ingredients);
    };

    handleRecipeComponentUpdate = (e, ingredientIndex, category) => {
        let name = e.target.name;
        let value = e.target.value;

        let ingredients = this.chooseIngredients(category);

        ingredients[ingredientIndex][name] = value;

        this.updateIngredients(category, ingredients);
    };

    handleRecipeComponentDeleteIngr = (ingredientIndex, category) => {
        let ingredients = this.chooseIngredients(category);

        ingredients.splice(ingredientIndex, 1);

        this.updateIngredients(category, ingredients);
    };

    /* ---------------OBSŁUGA BUTTONA----------------- */

    // do uaktywnienia pól i buttonów po kliknięciu w button Edytuj
    // do zapisania zmian / zakończenia edycji i powrotu do poprzdniego widoku po kliknięciu w button 'Zapisz i zakończ edycję') -> dodanie zmian w danej warce do Firebase
    onEditClick =(e) => {

        if (this.state.disabled) {
            e.preventDefault();  // to zapobiega uaktywnieniu Link z routera i przejściu na inną path
            this.setState({
                disabled: false,
                buttonText: 'Zapisz i zakończ edycję'
            });

        } else {
            // tworzę referencję do konkretnej warki w bazie i nadpisuję jej dane
            const batchKey = this.props.batch.key;
            const batchRef = firebase.database().ref(batchKey);
            let {name, style, date, ibu, srm, alcohol, volume, density, type} = this.state;
            let ingredients_ferm, ingredients_yeast, ingredients_hop, ingredients_addons;

            // Ponieważ w Firebase nie zapisują się puste tablice, to w wypadku kiedy nia ma którychś składników dodanych w Recipe, to zamieniam pustą tablicę na pustego stringa, który zapisze się w Firebase.
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
            // tworzę nowe dane na podstawie state
            const newBatch = {
                "details": {
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
            };

            // zapisuję do bazy
            batchRef.set(newBatch);

            /* ----------- dodanie pliku do storage -------------- */

            // tworzę storage reference
            const storageRef = firebase.storage().ref();

            // pobieram plik zapisany wcześniej w state
            let file = this.state.inputFile;

            // zapisuję plik w storage --> nazwa pliku to key warki
            file && storageRef.child(`images/${batchKey}`).put(file).then(function(snapshot) {
                console.log('Uploaded file!');
            });
        }
    };

        /* ------------------------------------------------ */

    onDeleteBatchClick = (batchToDelete) => {
        const batchRef = firebase.database().ref(batchToDelete);
        batchRef.remove();
    };

    /* ------------------------------------------------ */



    render() {
        let { activeItem, name, style, date, ibu, srm, alcohol, volume, density, type, ingredients_ferm, ingredients_yeast, ingredients_hop, ingredients_addons, disabled }  = this.state;
        const deleteBatchButton =
            <Button type='text' color="blue" style={{position: 'relative', left: '45em', marginTop: '1em'}} onClick={this.togglePopup}>Usuń warkę</Button>;

        return (
            <div style={{height: '100%', width: '75%'}}>
                <Menu attached='top' pointing secondary>
                    <Link to= {`/batchdetails/${this.props.batch.key}`}>
                        <Menu.Item name="details" active={activeItem === 'details'} onClick={this.handleItemClick}>
                            Podsumowanie
                        </Menu.Item>
                    </Link>
                    <Link to= {`/batchdetails/${this.props.batch.key}/recipe`}>
                        <Menu.Item name="recipe" active={activeItem === 'recipe'} onClick={this.handleItemClick}>
                            Receptura
                        </Menu.Item>
                    </Link>
                    <Link to={`/batchdetails/${this.props.batch.key}/rating_comments`}>
                        <Menu.Item name="rating-comments" active={activeItem === 'rating-comments'} onClick={this.handleItemClick}>
                            Ocena i uwagi
                        </Menu.Item>
                    </Link>
                    <Link to={`/batchdetails/${this.props.batch.key}/files`}>
                        <Menu.Item name="files" active={activeItem === 'files'} onClick={this.handleItemClick}>
                            Załączniki
                        </Menu.Item>
                    </Link>
                </Menu>
                <Segment attached='bottom'>
                    <Form style={{position: 'relative'}}>
                        <Switch>

                            /* -------- widok Podsumowania -------- */

                            <Route
                                exact path="/batchdetails/:batchKey"
                                render={(routeProps) => (
                                    <Details {...routeProps} disabled={this.state.disabled} componentUpdate = {this.handleDetailsComponentUpdate} name={this.state.name} style={this.state.style} ibu={this.state.ibu} alcohol={this.state.alcohol} volume={this.state.volume} date={this.state.date} srm={this.state.srm} density={this.state.density} type={this.state.type}/>
                                )}
                            />

                            /* -------- widok Receptury -------- */

                            <Route
                                exact path="/batchdetails/:batchKey/recipe"
                                render={(routeProps) => (
                                    <Recipe {...routeProps} disabled={this.state.disabled} componentUpdate = {this.handleRecipeComponentUpdate} ingredients_ferm={this.state.ingredients_ferm} ingredients_yeast={this.state.ingredients_yeast} ingredients_hop={this.state.ingredients_hop} ingredients_addons={this.state.ingredients_addons} componentAdd = {this.handleRecipeComponentAddIngr} componentDelete={this.handleRecipeComponentDeleteIngr}/>
                                )}
                            />

                            /* -------- widok Oceny i Komentarzy -------- */

                            {/*<Route exact path="/batchdetails/:batchKey/rating-comments" component={ Rating_Comments }></Route>*/}

                            /* -------- widok Załączników -------- */

                            <Route
                                exact path="/batchdetails/:batchKey/files"
                                render={(routeProps) => (
                                    <Files {...routeProps} disabled={this.state.disabled} onFileUpload={this.onFileUpload} file={this.state.inputFile} imagePreviewUrl={this.state.imagePreviewUrl}/>
                                    )}
                            />
                        </Switch>

                        /* ---------------- */

                        <Divider> </Divider>
                        <Link to={this.props.pathToGoBack}>
                            <Button type='text' color="blue" style={{position: 'relative', left: '42em', marginTop: '1em'}} onClick={this.onEditClick}>{this.state.buttonText}</Button>
                        </Link>
                        <Popup
                            trigger={deleteBatchButton}
                            on='click'
                            position='top right'
                            flowing
                            open={this.state.isPopupOpen}
                        >
                            <Popup.Header>
                                Czy na pewno chcesz usunąć warkę?
                            </Popup.Header>
                            <Popup.Content>
                                <Link to={this.props.pathToGoBack}>
                                    <Button color='blue' content='Tak' onClick = {() => this.onDeleteBatchClick(this.props.batch.key)}/>
                                </Link>
                                <Button color='green' content='Nie' onClick={this.togglePopup}/>
                            </Popup.Content>
                        </Popup>
                    </Form>
                </Segment>
            </div>
        )
    }
};