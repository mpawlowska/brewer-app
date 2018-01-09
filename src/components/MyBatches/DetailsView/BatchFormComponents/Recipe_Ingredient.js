import React from "react";
import { Button, Input } from "semantic-ui-react"

export const Recipe_Ingredient = (props) => {

    const { index, disabled, name, quantity } = props;

    const onClick = () => {
         props.onDeleteClick(index);
     };

    const onChange = (e) => {
         props.onChange(e, index);
     };

     // w value inputów przekazuję wartość z propsów, tak aby po usuwaniu okreslonych inputów, koklejny render powodował pokazywanie się odpowiednich elementów (z odpowiednimi wartościami) - wartości te sa brane z metody map tablicy, w której zapisuję wartości z tych inputów (w rodzicu: Ingredients)
    return (
         <div style = {{marginBottom: "0.5em"}}>
             <Input disabled={disabled} type="text" name="name" style={{width: "70%"}}  value={name} onChange={onChange}/>
             <Input disabled={disabled} type="text" name="quantity" placeholder="Ilość" style={{width: "15%"}}  value={quantity} onChange={onChange}/>
             <Button size="mini"
                     disabled={disabled}
                     style={{marginLeft: "1em", padding: "0.5em"}}
                     onClick={onClick}>
                 Usuń
             </Button>
         </div>
    )
 };