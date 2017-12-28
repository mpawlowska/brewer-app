import React from 'react';
import { Menu, Segment, Form, Container, Button, Divider, Input, Icon } from 'semantic-ui-react'

 export default class Recipe_Ingredient extends React.Component {
     constructor(props) {
         super(props);
     }

     onClick = () => {
         this.props.onDeleteClick(this.props.index);
     };

     onChange = (e) => {
         this.props.onChange(e, this.props.index);
     };

     // w value inputów przekazuję wartość z propsów, tak aby po usuwaniu okreslonych inputów, koklejny render powodował pokazywanie się odpowiednich elementów (z odpowiednimi wartościami) - wartości te sa brane z metody map tablicy, w której zapisuję wartości z tych inputów (w rodzicu: ingredients)

     render() {
          return (
             <div style = {{marginBottom: '0.5em'}}>
                 <Input disabled={this.props.disabled} type="text" style={{width: "70%"}} name='name' value={this.props.name} onChange={this.onChange}/>
                 <Input disabled={this.props.disabled} type="text" placeholder="Ilość" style={{width: "15%"}} name="quantity" value={this.props.quantity} onChange={this.onChange}/>
                 <Button size="mini"
                         style={{marginLeft: '1em', padding: '0.5em'}}
                         onClick={this.onClick}>
                     Usuń
                 </Button>
             </div>
          )
     }
 }