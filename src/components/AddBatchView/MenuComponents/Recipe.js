import React from 'react';
import { Menu, Segment, Form, Container, Button, Divider } from 'semantic-ui-react'

export default class Recipe extends React.Component {
    constructor(props) {
        super(props);

        // this.state = {
        //     activeItem: 'details'
        // }
    }

    // tu trzeba jeszcze dodać rzeczy procesowe - chmielenie, zacieranie itp.
    render() {
        return (
            <Container style={{height: "100%"}}>

                <Form.Group widths="equal">
                    <Form.Field>
                        <label>Składniki fermentowalne</label>
                        <Divider/>
                        <Button content='Dodaj składnik' icon='add' labelPosition='left' size="mini" />
                    </Form.Field>
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