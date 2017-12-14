import React from 'react';
import { Menu, Segment, Form, Container, Button, Divider, Input, Icon } from 'semantic-ui-react'

 export default class Recipe_Ingredient extends React.Component {
     constructor(props) {
         super(props);
     }

     render() {
         return (
             <div>
                 <Input type="text" style={{width: "70%"}}/>
                 <Input type="text" placeholder="Ilość" style={{width: "15%"}}/>
                 <Button icon="minus" size="mini" style={{marginLeft: '1em'}} onClick = {this.props.onClick}/>
             </div>
         )
     }
 }