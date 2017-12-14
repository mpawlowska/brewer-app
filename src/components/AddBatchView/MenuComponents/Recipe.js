import React from 'react';
import { Menu, Segment, Form, Container, Button, Divider, Input, Icon } from 'semantic-ui-react'
import Recipe_Ingredient from './Recipe_Ingredient';

class RecipeFermentIngredients extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ingredients: []
        }
    }

    handleAddButtonClick = () => {
        this.setState({
            ingredients: this.state.ingredients.concat(['ingredient'])
        })
    };

    handleDeleteButtonClick = () => {
        console.log()
        this.setState({
            ingredients: this.state.ingredients.splice[]
        })
    };


    render() {
        return (
            <Form.Field>
                <label>Składniki fermentowalne</label>
                <Divider/>
                {this.state.ingredients.map((elem, i) => <Recipe_Ingredient key={i} onClick={this.handleDeleteButtonClick} index={i}/>)}
                <Button content='Dodaj składnik' icon='add' labelPosition='left' size="mini" onClick={this.handleAddButtonClick}/>
            </Form.Field>
        )
    }
}

// export default class RecipeYeast extends React.Component {
//     constructor(props) {
//         super(props);
//     }
// }
//
// export default class RecipeHop extends React.Component {
//     constructor(props) {
//         super(props);
//     }
// }
//
// export default class RecipeAddons extends React.Component {
//     constructor(props) {
//         super(props);
//     }
// }





export default class Recipe extends React.Component {
    constructor(props) {
        super(props);
    }

// tu trzeba jeszcze dodać rzeczy procesowe - chmielenie, zacieranie itp.
    render() {
        return (
            <Container style={{height: "100%"}}>

                <Form.Group widths="equal">
                    <RecipeFermentIngredients/>
                    <Form.Field>
                        <label>Drożdże</label>
                        <Divider/>
                        <Button content='Dodaj składnik' icon='add' labelPosition='left' size="mini" />
                    </Form.Field>
                </Form.Group>
                <Form.Group widths="equal">
                    <Form.Field>
                        <label>Chmiele</label>
                        <Divider/>
                        <Button content='Dodaj składnik' icon='add' labelPosition='left' size="mini" />
                    </Form.Field>
                    <Form.Field>
                        <label>Dodatki</label>
                        <Divider/>
                        <Button content='Dodaj składnik' icon='add' labelPosition='left' size="mini" />
                    </Form.Field>
                </Form.Group>
            </Container>
        )
    }
}