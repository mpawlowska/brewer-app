import React from 'react';
import { Menu, Segment, Form, Container, Button, Divider, Input, Icon } from 'semantic-ui-react'
import Recipe_Ingredient from './Recipe_Ingredient';

class RecipeIngredients extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            counter: 0,
            ingredients: [],
            ingredientsValues: []

        }
    }
    handleAddButtonClick = () => {
        this.setState({
            counter: this.state.counter + 1,
            ingredients: this.state.ingredients.concat([this.state.counter])
        });
    };

    render() {
        return (
            <Form.Field>
                <label>{this.props.label}</label>
                <Divider/>
                {this.state.ingredients.map((elem, index) => <Recipe_Ingredient key={index}/>)}
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