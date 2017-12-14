import React from 'react';
import { Menu, Segment, Form, Container, Button, Divider, Input, Icon } from 'semantic-ui-react'

 export default class Recipe_Ingredient extends React.Component {
     constructor(props) {
         super(props);
     }

     onClick = (e) => {
         const parent = e.target.parentNode;
         const formField = parent.parentNode;
            formField.removeChild(parent);
     };

     render() {
         return (
                 <div>
                     <Input type="text" style={{width: "70%"}}/>
                     <Input type="text" placeholder="Ilość" style={{width: "15%"}}/>
                     <Button size="mini"
                             style={{marginLeft: '1em', padding: '0.5em'}}
                             onClick={this.onClick}>
                         Usuń
                     </Button>
                 </div>
         )}
 }