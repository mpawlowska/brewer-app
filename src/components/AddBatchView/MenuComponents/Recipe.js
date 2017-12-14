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
        const newIngredientObj = {name: '', quantity: ''};
        let newIngredientsValues = this.state.ingredientsValues;

        newIngredientsValues.push(newIngredientObj);

        this.setState({
            counter: this.state.counter + 1,
            ingredients: this.state.ingredients.concat([this.state.counter]),
            ingredientsValues: newIngredientsValues
        });
    };

    handleOnInput = (e, index) => {
        console.log('z rodzica', e.target.value, e.target.name, );

        // this.setState({
        //     ingredientsValues:
        // })

    };


        // this.setState({
        //         ingredientsName: this.state.ingredientsName.concat([inputValue])
        //     });

        // this.setState({
        //     ingredientsName: this.state.ingredientsName.concat([inputValue])
        // });
        //
        // console.log(this.state.ingredientsNameAndQuantity);

    render() {
        return (
            <Form.Field>
                <label>{this.props.label}</label>
                <Divider/>
                {this.state.ingredients.map((elem, index) => <Recipe_Ingredient key={index} onChange={this.handleInputChange} onInput={this.handleOnInput} index={index}/>)}
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