import React from 'react';
import {
    Route,
    Switch,
    Link
} from 'react-router-dom';
import { Menu, Segment, Form, Button } from 'semantic-ui-react'
import Details from '../AddBatchView/MenuComponents/Details';
import Recipe from '../AddBatchView/MenuComponents/Recipe';
import Rating_Comments from '../AddBatchView/MenuComponents/Rating_Comments';
import Files from '../AddBatchView/MenuComponents/Files';

export default class DetailsMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeItem: 'details'
        };
    }

        handleItemClick = (e, {name}) => {
            console.log(name);
            this.setState({
                activeItem: name
            })
        };

    render() {
        let {activeItem} = this.state;
        let {name, style, date, ibu, srm, alcohol, volume, density, type} = this.props.batch.details;
        let {fermenting_components: ingredients_ferm, yeast: ingredients_yeast, hop: ingredients_hop}  = this.props.batch.recipe;

        return (
            <div style={{height: '100%', width: '75%'}}>
                <Menu attached='top' pointing secondary>
                    <Link to="/batchdetails">
                        <Menu.Item name="details" active={activeItem === 'details'} onClick={this.handleItemClick}>
                            Podsumowanie
                        </Menu.Item>
                    </Link>
                    <Link to="/batchdetails/recipe">
                        <Menu.Item name="recipe" active={activeItem === 'recipe'} onClick={this.handleItemClick}>
                            Receptura
                        </Menu.Item>
                    </Link>
                    <Link to="/batchdetails/rating_comments">
                        <Menu.Item name="rating-comments" active={activeItem === 'rating-comments'} onClick={this.handleItemClick}>
                            Ocena i uwagi
                        </Menu.Item>
                    </Link>
                    <Link to="/batchdetails/files">
                        <Menu.Item name="files" active={activeItem === 'files'} onClick={this.handleItemClick}>
                            Załączniki
                        </Menu.Item>
                    </Link>

                </Menu>
                <Segment attached='bottom'>
                    <Form style={{position: 'relative'}}>
                        <Switch>
                            <Route
                                exact path="/batchdetails"
                                render={(routeProps) => (
                                    <Details {...routeProps} componentUpdate = {this.handleDetailsComponentUpdate} name={name} style={style} ibu={ibu} alcohol={alcohol} volume={volume} date={date} srm={srm} density={density} type={type}/>
                                )}
                            />
                            <Route
                                exact path="/batchdetails/recipe"
                                render={(routeProps) => (
                                    <Recipe {...routeProps} componentUpdate = {this.handleRecipeComponentUpdate} ingredients_ferm={ingredients_ferm} ingredients_yeast={ingredients_yeast} ingredients_hop={ingredients_hop} componentAdd = {this.handleRecipeComponentAddIngr} componentDelete={this.handleRecipeComponentDeleteIngr}/>
                                )}
                            />
                            <Route exact path="/batchdetails/rating-comments" component={ Rating_Comments }></Route>
                            <Route exact path="/batchdetails/files" component={ Files }></Route>
                        </Switch>
                        <Button type='submit' color="blue" style={{position: 'relative', left: '42em', marginTop: '1em'}} onClick={this.onCloseClick}>Edytuj</Button>
                    </Form>
                </Segment>
            </div>
        )
    }
}



/*
export default class AddMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeItem: 'details',
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

    // do przechwytywania danych z inputów w Recepturze - najpierw tworzę funkcje uniwersalne, któtre będą określały, który rodzaj składnikach powinien być poddany zmianie
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

    onCloseClick = () => {

    };

    render() {
        let { activeItem, name, style, date, ibu, srm, alcohol, volume, density, type, ingredients_ferm, ingredients_yeast, ingredients_hop, ingredients_addons }  = this.state;

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
                                    <Details {...routeProps} componentUpdate = {this.handleDetailsComponentUpdate} name={name} style={style} ibu={ibu} alcohol={alcohol} volume={volume} date={date} srm={srm} density={density} type={type}/>
                                )}
                            />
                            <Route
                                exact path="/newbatch/recipe"
                                render={(routeProps) => (
                                    <Recipe {...routeProps} componentUpdate = {this.handleRecipeComponentUpdate} ingredients_ferm={ingredients_ferm} ingredients_yeast={ingredients_yeast} ingredients_hop={ingredients_hop} ingredients_addons={ingredients_addons} componentAdd = {this.handleRecipeComponentAddIngr} componentDelete={this.handleRecipeComponentDeleteIngr}/>
                                )}
                            />
                            <Route exact path="/newbatch/rating-comments" component={ Rating_Comments }></Route>
                            <Route exact path="/newbatch/files" component={ Files }></Route>
                        </Switch>
                        <Button type='submit' color="blue" style={{position: 'relative', left: '42em', marginTop: '1em'}} onClick={this.onCloseClick}>Zakończ dodawanie warki</Button>
                    </Form>
                </Segment>
            </div>
        )
    }
}
*/
