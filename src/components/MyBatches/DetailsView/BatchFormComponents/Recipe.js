import React from "react";
import { Form, Container, Button, Divider } from "semantic-ui-react"
import { Recipe_Ingredient } from "./Recipe_Ingredient";

// tu można jeszcze dodać rzeczy procesowe - chmielenie, zacieranie itp.

export const Recipe = (props) => {

    const { disabled, ingredients_ferm, ingredients_yeast, ingredients_hop, ingredients_addons } = props;
    const widths = "equal";

    return (
        <Container style={{height: "100%"}}>
            <Form.Group widths={widths}>
                <RecipeIngredients disabled={disabled} label="Składniki fermentowalne" ingredients={ingredients_ferm} componentUpdate={props.componentUpdate} componentAdd={props.componentAdd} componentDelete={props.componentDelete} category="ingredients_ferm"/>
                <RecipeIngredients disabled={disabled} label="Drożdże" ingredients={ingredients_yeast} componentUpdate={props.componentUpdate} componentAdd={props.componentAdd} componentDelete={props.componentDelete} category="ingredients_yeast"/>
            </Form.Group>
            <Form.Group widths={widths}>
                <RecipeIngredients disabled={disabled} label="Chmiele" ingredients={ingredients_hop} componentUpdate={props.componentUpdate} componentAdd={props.componentAdd} componentDelete={props.componentDelete} category="ingredients_hop"/>
                <RecipeIngredients disabled={disabled} label="Dodatki" ingredients={ingredients_addons} componentUpdate={props.componentUpdate} componentAdd={props.componentAdd} componentDelete={props.componentDelete} category="ingredients_addons"/>
            </Form.Group>
        </Container>
    )
};


const RecipeIngredients = (props) => {

    const { category, label, ingredients, disabled } = props;

    // dodaję puste pole z inputami:
    const onAddButtonClick = () => {
        props.componentAdd(category);
    };

    // usuwam dany obiekt z inputami z tablicy ingredients - identyfikuję go na podstawie index przekazanego w propsach przy tworzeniu za pomocą map, ten index otrzymuję dzięki wywołaniu metody w dziecku
    const handleDeleteButtonClick = (ingredientIndex) => {
        props.componentDelete(ingredientIndex, category);
    };

    const handleInputChange = (e, ingredientIndex) => {
        props.componentUpdate(e, ingredientIndex, category);
    };

    return (
        <Form.Field>
            <label>{label}</label>
            <Divider/>
            {ingredients.map((ingredient, index) => <Recipe_Ingredient key={index} index={index} disabled={disabled} onChange={handleInputChange} onDeleteClick={handleDeleteButtonClick} name={ingredient["name"]} quantity={ingredient["quantity"]}/>)}
            <Button disabled={disabled} content="Dodaj składnik" icon="add" labelPosition="left" size="mini" onClick={onAddButtonClick}/>
        </Form.Field>
    )
};
