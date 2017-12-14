import React from 'react';
import { Menu, Segment, Form, Container, Button, Divider, Input, Icon } from 'semantic-ui-react'

 export default class Recipe_Ingredient extends React.Component {
     constructor(props) {
         super(props);

         this.state = {
             index: this.props.index,
             name: '',
             quantity: ''
         }
     }

     onClick = (e) => {
         const parent = e.target.parentNode;
         const formField = parent.parentNode;
            formField.removeChild(parent);
     };

     onChange = (e) => {
         const target = e.target;
         const name = target.name;
         const value = target.value;

         this.setState({
             [name]: value
         });
         console.log(this.state.name, this.state.quantity)

         this.props.onInput(this.state.index);
     };

     render() {
         return (
                 <div style = {{marginBottom: '0.5em'}}>
                     <Input type="text" style={{width: "70%"}} name='name' value={this.state.name} onChange={this.onChange} onInput={this.props.onInput} index={this.props.index}/>
                     <Input type="text" placeholder="Ilość" style={{width: "15%"}} name="quantity" value={this.state.quantity} onChange={this.onChange} onInput={this.props.onInput} index={this.props.index}/>
                     <Button size="mini"
                             style={{marginLeft: '1em', padding: '0.5em'}}
                             onClick={this.onClick}>
                         Usuń
                     </Button>
                 </div>
         )}
 }