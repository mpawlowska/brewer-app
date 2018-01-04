import React from 'react';
import { Container, Menu, Segment, Form, Rating, Divider, TextArea } from 'semantic-ui-react'

class RatingField extends React.Component {
    render() {
        return (
            <Form.Group>
                <Form.Field width={8} style={{textAlign: "center"}}>
                    <label>{this.props.label}</label>
                    <Rating icon='star' maxRating={7} />
                </Form.Field>

                <Form.Field width = {8} >
                    <TextArea rows = {2} placeholder="Komentarz..." style={{fontSize: '12px'}}/>
                </Form.Field>
            </Form.Group>

        )
    }
}

export default class Rating_Comments extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Container style={{height: "100%"}}>

                <Form.Field style={{marginTop: '1em'}}>
                    <RatingField label="Ocena ogólna" starWidth={7}/>
                </Form.Field>

                <Form.Field style={{marginTop: '2em'}}>
                    <Divider horizontal style={{marginBottom: '2em'}}>Ocena szczegółowa</Divider>
                    <RatingField label="Zgodność ze stylem" />
                    <RatingField label="Aromat" />
                    <RatingField label="Wygląd" />
                    <RatingField label="Smak" />
                    <RatingField label="Goryczka" />
                </Form.Field>

                <Form.Field style={{marginTop: '2em'}}>
                    <Divider horizontal>Uwagi dodatkowe</Divider>
                    <Form.TextArea rows = {2} style={{fontSize: '12px'}}/>
                </Form.Field>

            </Container>
        )
    }
}
