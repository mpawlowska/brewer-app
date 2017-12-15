import React from 'react';
import { Menu, Segment, Form, Container, Button, Divider, Input, Icon } from 'semantic-ui-react'
import Recipe_Ingredient from './Recipe_Ingredient';

class RecipeIngredients extends React.Component {
    constructor(props) {
        super(props);

        // w state.ingredients zapisują się w tablicy wartości z inputów (nazwa składnika i ilość) w postaci obiektów {name: '', quantity: ''
        this.state = {
            ingredients: []
        }
    }
    // dodaję puste pole z inputami:
    handleAddButtonClick = () => {
        const newIngredientObj = {name: '', quantity: ''};
        let { ingredients } = this.state;

        ingredients.push(newIngredientObj);

        this.setState({
            ingredients: ingredients
        });
    };

    // usuwam dany obiekt z inputami z tablicy ingredients - identyfikuję go na podstawie index przekazanego w propsach przy tworzeniu za pomocą map, ten index otrzymuję dzięki wywołaniu metody w dziecku
    handleDeleteButtonClick = (ingredientIndex) => {
        let { ingredients } = this.state;
        ingredients.splice(ingredientIndex, 1);

        this.setState({
            ingredients: ingredients
        });
    };

    handleInputChange = (ingredientIndex, name, value) => {
        let { ingredients } = this.state;
        ingredients[ingredientIndex][name] = value;

        this.setState({
            ingredients: ingredients
        });
    };

    render() {
        console.log(this.state.ingredients);
        return (
            <Form.Field>
                <label>{this.props.label}</label>
                <Divider/>
                {this.state.ingredients.map((ingredient, index) => <Recipe_Ingredient key={index} index={index} onChange={this.handleInputChange} onDeleteClick={this.handleDeleteButtonClick} name={ingredient['name']} quantity={ingredient['quantity']}/>)}
                <Button content='Dodaj składnik' icon='add' labelPosition='left' size="mini" onClick={this.handleAddButtonClick}/>
            </Form.Field>
        )
    }
}

export default class Recipe extends React.Component {
    constructor(props) {
        super(props);
    }

// tu trzeba jeszcze dodać rzeczy procesowe - chmielenie, zacieranie itp.
    render() {
        return (
            <Container style={{height: "100%"}}>
                <Form.Group widths="equal">
                    <RecipeIngredients label="Składniki fermentowalne"/>
                    <RecipeIngredients label="Drożdże"/>
                </Form.Group>
                <Form.Group widths="equal">
                    <RecipeIngredients label="Chmiele"/>
                    <RecipeIngredients label="Dodatki"/>
                </Form.Group>
            </Container>
        )
    }
}