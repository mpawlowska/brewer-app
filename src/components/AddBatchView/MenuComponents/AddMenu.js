import React from 'react';
import {
    Route,
    Switch,
    Link
} from 'react-router-dom';
import { Menu, Segment, Form, Button, Divider } from 'semantic-ui-react'
import Details from './Details';
import Recipe from './Recipe';
import Rating_Comments from './Rating_Comments';
import Files from './Files';

export default class AddMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeItem: 'details',
            disabled: false,

            name: '',
            style: '',
            date: '',
            volume: '',
            ibu: '',
            srm: '',
            density: '',
            alcohol: '',
            type: '',
            ingredients_ferm: [],
            ingredients_yeast: [],
            ingredients_hop: [],
            ingredients_addons: [],
            rateGeneral: '',
            rateStyle: '',
            rateAroma: '',
            rateLook: '',
            rateFlavor : '',
            rateBitterness: '',
            commentGeneral: '',
            commentStyle: '',
            commentAroma: '',
            commentLook: '',
            commentFlavor : '',
            commentBitterness: '',
            commentAdditional: '',
            inputFile: '',
            imagePreviewUrl: '',
            hasImage: "false"
        }
    }

    // do zmiany aktywnej zakładki w menu
    handleItemClick = (e, { name }) => {
        this.setState({activeItem: name})
    };

    // do przechwytywania danych z inputów w Podsumowaniu
    handleDetailsComponentUpdate = (name, value) => {
        this.setState({
            [name]: value
        });
    // przekazuję jeszcze wyżej bo potrzebuję do nowej batchCard - można to jakoś ograniczyć, aby wywoływało się tylko przy zmianie kilku określonych kluczy
        this.props.onDetailsChange(name, value);
    };

    /* ---------------------OBSŁUGA FILES/ZDJĘCIE--------------------------- */

    onFileUpload = (inputFile, imagePreviewUrl, boolean) => {
        // najpierw przekazuję wyżej url, aby image mógł sie wyświetlić w BatchCard
        this.props.onImageChange(imagePreviewUrl);

        this.setState({
            inputFile: inputFile,
            imagePreviewUrl: imagePreviewUrl,
            hasImage: boolean
        })
    };

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
            default: console.log('Nie znaleziono odpowiednich ingredients');
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

        // if (!ingredients) {
        //     ingredients = [];
        //     ingredients.push(newIngredientObj);
        // }
        // else {
        //     ingredients.push(newIngredientObj);
        // }

        this.updateIngredients(category, ingredients);
    };

    handleRecipeComponentUpdate = (e, ingredientIndex, category) => {
        let name = e.target.name;
        let value = e.target.value;

        let ingredients = this.chooseIngredients(category);

        ingredients[ingredientIndex][name] = value;

        // if (!ingredients) {
        //     ingredients = [];
        //     ingredients[ingredientIndex][name] = value;
        // }
        // else {
        //     ingredients[ingredientIndex][name] = value;
        // }

        this.updateIngredients(category, ingredients);
    };

    handleRecipeComponentDeleteIngr = (ingredientIndex, category) => {
        let ingredients = this.chooseIngredients(category);

        ingredients.splice(ingredientIndex, 1);

        this.updateIngredients(category, ingredients);
    };

    /* ----------- OBSŁUGA BUTTONA 'ZAKOŃCZ DODAWANIE WARKI' - dodanie nowej warki do bazy i pliku do storage -------------- */

    onCloseClick = () => {

        // tworzę referencję do bazy i potrzebne mi zmienne
        const batchesRef = firebase.database().ref();
        let { hasImage, name, style, date, ibu, srm, alcohol, volume, density, type, rateBitterness, rateStyle, rateAroma, rateLook, rateGeneral, rateFlavor, commentAroma, commentStyle, commentLook, commentGeneral, commentFlavor, commentAdditional, commentBitterness } = this.state;
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

        if(this.state.inputFile) {
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
        let { activeItem, name, style, date, ibu, srm, alcohol, volume, density, type, ingredients_ferm, ingredients_yeast, ingredients_hop, ingredients_addons, disabled, rateGeneral, rateAroma, rateBitterness, rateflavor, rateLook, rateStyle, commentAdditional, commentAroma, commentBitterness, commentFlavor, commentGeneral, commentLook, commentStyle }  = this.state;

        return (
            <div style={{height: '100%', width: '75%'}}>
                <Menu attached='top' pointing secondary>
                    <Link to="/newbatch">
                        <Menu.Item name="details" active={activeItem === 'details'} onClick={this.handleItemClick}>
                            Podsumowanie
                        </Menu.Item>
                    </Link>
                    <Link to="/newbatch/recipe">
                        <Menu.Item name="recipe" active={activeItem === 'recipe'} onClick={this.handleItemClick}>
                            Receptura
                        </Menu.Item>
                    </Link>
                    <Link to="/newbatch/rating_comments">
                        <Menu.Item name="rating-comments" active={activeItem === 'rating-comments'} onClick={this.handleItemClick}>
                            Ocena i uwagi
                        </Menu.Item>
                    </Link>
                    <Link to="/newbatch/files">
                        <Menu.Item name="files" active={activeItem === 'files'} onClick={this.handleItemClick}>
                            Załączniki
                        </Menu.Item>
                    </Link>

                </Menu>
                <Segment attached='bottom'>
                    <Form style={{position: 'relative'}}>
                        <Switch>
                            <Route
                                exact path="/newbatch"
                                render={(routeProps) => (
                                    <Details {...routeProps} disabled={disabled} componentUpdate = {this.handleDetailsComponentUpdate} name={name} style={style} ibu={ibu} alcohol={alcohol} volume={volume} date={date} srm={srm} density={density} type={type}/>
                                )}
                            />
                            <Route
                                exact path="/newbatch/recipe"
                                render={(routeProps) => (
                                    <Recipe {...routeProps} disabled={disabled} componentUpdate = {this.handleRecipeComponentUpdate} ingredients_ferm={ingredients_ferm} ingredients_yeast={ingredients_yeast} ingredients_hop={ingredients_hop} ingredients_addons={ingredients_addons} componentAdd = {this.handleRecipeComponentAddIngr} componentDelete={this.handleRecipeComponentDeleteIngr}/>
                                )}
                            />
                            <Route
                                exact path="/newbatch/rating_comments"
                                render={(routeProps) => (
                                    <Rating_Comments {...routeProps} disabled={this.state.disabled} handleRate={this.handleRateChange} rateGeneral={rateGeneral} rateAroma={rateAroma} rateBitterness={rateBitterness} rateflavor={rateflavor} rateLook={rateLook} rateStyle={rateStyle} commentBitterness={commentBitterness} commentAdditional={commentAdditional} commentFlavor={commentFlavor} commentLook={commentLook} commentStyle={commentStyle} commentAroma={commentAroma} commentGeneral={commentGeneral} handleCommentChange={this.handleCommentChange}/>
                                )}
                            />
                            <Route
                                exact path="/newbatch/files"
                                render={(routeProps) => (
                                    <Files {...routeProps} disabled={disabled} onFileUpload={this.onFileUpload} imagePreviewUrl={this.state.imagePreviewUrl} />
                                )}
                            />
                        </Switch>

                        <Divider> </Divider>

                        <Link to={this.props.pathToGoBack}>
                            <Button type='submit' onClick={this.onCloseClick} color="blue" style={{position: 'relative', left: '42em', marginTop: '0.5em'}}>Zakończ dodawanie warki</Button>
                        </Link>
                    </Form>
                </Segment>
            </div>
        )
    }
}




