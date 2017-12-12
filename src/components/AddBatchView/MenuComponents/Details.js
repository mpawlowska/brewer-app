import React from 'react';
import { Form, Container, Grid } from 'semantic-ui-react'

export default class Details extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Container style={{height: "100%"}}>
                <Form.Group widths="equal">
                    <Form.Field>
                        <label>Nazwa</label>
                        <input />
                    </Form.Field>
                    <Form.Field>
                        <label>Styl</label>
                        <input />
                    </Form.Field>
                </Form.Group>
                <Form.Group widths="equal">
                    <Form.Field>
                        <label>Data warzenia</label>
                        <input />
                    </Form.Field>
                    <Form.Field>
                        <label>Wielkość</label>
                        <input />
                    </Form.Field>
                </Form.Group>
                <Form.Group widths="equal">
                    <Form.Field>
                        <label>IBU</label>
                        <input />
                    </Form.Field>
                    <Form.Field>
                        <label>SRM</label>
                        <input />
                    </Form.Field>
                </Form.Group>
                <Form.Group widths="equal">
                    <Form.Field>
                        <label>Gęstość</label>
                        <input />
                    </Form.Field>
                    <Form.Field>
                        <label>Alkohol</label>
                        <input />
                    </Form.Field>
                </Form.Group>
                    <Form.Field>
                        <label>Typ</label>
                        <input />
                    </Form.Field>
            </Container>
        )
    }
}

/*
 "name": "McDusia",
 "style": "lager",
 "date": "04.06.2016",
 "volume": "20l",
 "IBU": "35",
 "SRM": "5",
 "density": "24 BLG",
 "alcohol": "5%",
 "type": "zacieranie"
 */
