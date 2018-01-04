import React from 'react';
import { Container, Menu, Segment, Form, Rating, Divider, TextArea } from 'semantic-ui-react'

class RatingField extends React.Component {
    constructor() {
        super();

    }

    handleRate = (e, {rating}) => {
        let {name} = this.props;
        this.props.handleRate(name, rating)
    };

    render() {
        return (
            <Form.Group>
                <Form.Field width={8} style={{textAlign: "center"}}>
                    <label>{this.props.label}</label>
                    {/*<input type='range' min={0} max={5} value={rating} onChange={this.handleChange} />*/}
                    <Rating onRate={this.handleRate} icon='star' maxRating={7} defaultRating={this.props.defaultRating}/>
                </Form.Field>

                <Form.Field width = {8} >
                    <Form.TextArea rows = {2} placeholder="Komentarz..." style={{fontSize: '12px'}}/>
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
                    <RatingField label="Ocena ogólna" name="rateGeneral" defaultRating={this.props.rateGeneral} handleRate={this.props.handleRate}/>
                </Form.Field>

                <Form.Field style={{marginTop: '2em'}}>
                    <Divider horizontal style={{marginBottom: '2em'}}>Ocena szczegółowa</Divider>
                    <RatingField label="Zgodność ze stylem" name="rateStyle" defaultRating={this.props.rateStyle} handleRate={this.props.handleRate}/>
                    <RatingField label="Aromat" name="rateAroma" defaultRating={this.props.rateAroma} handleRate={this.props.handleRate}/>
                    <RatingField label="Wygląd" name="rateLook" defaultRating={this.props.rateLook} handleRate={this.props.handleRate}/>
                    <RatingField label="Smak" name="rateFlavour" defaultRating={this.props.rateFlavour} handleRate={this.props.handleRate}/>
                    <RatingField label="Goryczka" name="rateBitterness" defaultRating={this.props.rateBitterness} handleRate={this.props.handleRate}/>
                </Form.Field>

                <Form.Field style={{marginTop: '2em'}}>
                    <Divider horizontal>Uwagi dodatkowe</Divider>
                    <Form.TextArea rows = {2} style={{fontSize: '12px'}}/>
                </Form.Field>

            </Container>
        )
    }
}
