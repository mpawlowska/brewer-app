import React from 'react';
import {
    Route,
    Switch,
    Link
} from 'react-router-dom';
import { Menu, Segment, Form, Button } from 'semantic-ui-react'
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
            ingredients_addons: []
        }
    }


    handleItemClick = (e, { name }) => {
        console.log(name);
        this.setState({activeItem: name})
    };

    // do przechwytywania danych z inputów w Podsumowaniu
    handleDetailsComponentUpdate = (name, value) => {
        this.setState({
            [name]: value,
        });
    // przekazuję jeszcze wyżej bo potrzebuję do nowej batchCard - można to jakoś ograniczyć, aby wywoływało się tylko przy zmianie kilku określonych kluczy
        this.props.onDetailsChange(name, value);
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
            default: console.log('nie naleziono odpowiednich ingredients');
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

    // obsługa buttona 'Zakończ dodawanie warki' --> dodanie nowej warki do Firebase
    onCloseClick = () => {
        console.log('klik');

        // Getting a reference to the database service
        const batchesRef = firebase.database().ref();
        const newBatch = {
            "details": {
                "name": this.state.name,
                "style": this.state.style,
                "date": this.state.date,
                "volume": this.state.volume,
                "IBU": this.state.ibu,
                "SRM": this.state.srm,
                "density": this.state.density,
                "alcohol": this.state.alcohol,
                "type": this.state.type
            },
            "recipe": {
                "fermenting_components": this.state.ingredients_ferm,
                "hop": this.state.ingredients_hop,
                "yeast": this.state.ingredients_yeast
            },
        };

        batchesRef.push(newBatch);


    };

    render() {
        let { activeItem, name, style, date, ibu, srm, alcohol, volume, density, type, ingredients_ferm, ingredients_yeast, ingredients_hop, ingredients_addons, disabled }  = this.state;

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
                            <Route exact path="/newbatch/rating-comments" disabled={disabled} component={ Rating_Comments }></Route>
                            <Route exact path="/newbatch/files" disabled={disabled} component={ Files }></Route>
                        </Switch>
                        <Link to={this.props.pathToGoBack}>
                            <Button type='submit' color="blue" style={{position: 'relative', left: '42em', marginTop: '1em'}} onClick={this.onCloseClick}>Zakończ dodawanie warki</Button>
                        </Link>
                    </Form>
                </Segment>
            </div>
        )
    }
}


