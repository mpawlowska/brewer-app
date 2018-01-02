import React from 'react';
import { Menu, Segment, Form, Container, Button, Divider, Input, Icon } from 'semantic-ui-react'
import Recipe_Ingredient from './Recipe_Ingredient';


// cały stan dodanych / wpisanych inputów przechowuję w kompencie wyżej - w rodzicu: AddMenu lub DetailsMenu

class RecipeIngredients extends React.Component {
    constructor(props) {
        super(props);
    }

    // dodaję puste pole z inputami:
    handleAddButtonClick = () => {
        let category = this.props.category;

        this.props.componentAdd(category);
    };

    // usuwam dany obiekt z inputami z tablicy ingredients - identyfikuję go na podstawie index przekazanego w propsach przy tworzeniu za pomocą map, ten index otrzymuję dzięki wywołaniu metody w dziecku
    handleDeleteButtonClick = (ingredientIndex) => {
        let category = this.props.category;

        this.props.componentDelete(ingredientIndex, category);
    };

    handleInputChange = (e, ingredientIndex) => {
        let category = this.props.category;

        this.props.componentUpdate(e, ingredientIndex, category);
    };

    // handleInputChange = (ingredientIndex, name, value) => {
    //     let { ingredients } = this.state;
    //     ingredients[ingredientIndex][name] = value;
    //
    //     this.setState({
    //         ingredients: ingredients
    //     });
    // };

    render() {
        return (
            <Form.Field>
                <label>{this.props.label}</label>
                <Divider/>
                {this.props.ingredients.map((ingredient, index) => <Recipe_Ingredient key={index} index={index} disabled={this.props.disabled} onChange={this.handleInputChange} onDeleteClick={this.handleDeleteButtonClick} name={ingredient['name']} quantity={ingredient['quantity']}/>)}
                <Button disabled={this.props.disabled} content='Dodaj składnik' icon='add' labelPosition='left' size="mini" onClick={this.handleAddButtonClick}/>
            </Form.Field>
        )
    }
}

export default class Recipe extends React.Component {
    constructor(props) {
        super(props);
    }

// tu można jeszcze dodać rzeczy procesowe - chmielenie, zacieranie itp.
    render() {
        return (
            <Container style={{height: "100%"}}>
                <Form.Group widths="equal">
                    <RecipeIngredients disabled={this.props.disabled} label="Składniki fermentowalne" ingredients={this.props.ingredients_ferm} componentUpdate={this.props.componentUpdate} componentAdd={this.props.componentAdd} componentDelete={this.props.componentDelete} category='ingredients_ferm'/>
                    <RecipeIngredients disabled={this.props.disabled} label="Drożdże" ingredients={this.props.ingredients_yeast} componentUpdate={this.props.componentUpdate} componentAdd={this.props.componentAdd} componentDelete={this.props.componentDelete} category='ingredients_yeast'/>
                </Form.Group>
                <Form.Group widths="equal">
                    <RecipeIngredients disabled={this.props.disabled} label="Chmiele" ingredients={this.props.ingredients_hop} componentUpdate={this.props.componentUpdate} componentAdd={this.props.componentAdd} componentDelete={this.props.componentDelete} category='ingredients_hop'/>
                    <RecipeIngredients disabled={this.props.disabled} label="Dodatki" ingredients={this.props.ingredients_addons} componentUpdate={this.props.componentUpdate} componentAdd={this.props.componentAdd} componentDelete={this.props.componentDelete} category='ingredients_addons'/>
                </Form.Group>
            </Container>
        )
    }
}