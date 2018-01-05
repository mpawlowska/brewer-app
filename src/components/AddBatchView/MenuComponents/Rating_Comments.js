import React from 'react';
import { Container, Form, Rating, Divider } from 'semantic-ui-react'

class RatingField extends React.Component {
    constructor() {
        super();
    }

    onRate = (e, {rating}) => {
        let {nameRate} = this.props;
        this.props.handleRate(nameRate, rating)
    };

    onCommentChange = (e) => {
        let text = e.target.value;
        let {nameComment} = this.props;
        this.props.handleCommentChange(nameComment, text)
    };

    render() {
        const { disabled } = this.props;
        return (
            <Form.Group>
                <Form.Field width={8} style={{textAlign: "center"}}>
                    <label>{this.props.label}</label>
                    <Rating onRate={this.onRate} icon='star' maxRating={7} defaultRating={this.props.defaultRating} disabled={disabled} clearable/>
                </Form.Field>

                <Form.Field width={8} >
                    <Form.TextArea rows={2} placeholder="Komentarz..." style={{fontSize: '12px'}} value={this.props.commentValue} onChange={this.onCommentChange} disabled={disabled}/>
                </Form.Field>
            </Form.Group>

        )
    }
}

export default class Rating_Comments extends React.Component {
    constructor(props) {
        super(props);
    }

    onCommentChange = (e) => {
        let text = e.target.value;
        let nameComment = "commentAdditional";
        this.props.handleCommentChange(nameComment, text)
    };

    render() {
        const { disabled } = this.props;
        return(
            <Container style={{height: "100%"}}>

                <Form.Field style={{marginTop: '1em'}}>
                    <RatingField label="Ocena ogólna" nameRate="rateGeneral" nameComment="commentGeneral" commentValue={this.props.commentGeneral} defaultRating={this.props.rateGeneral} handleRate={this.props.handleRate} handleCommentChange={this.props.handleCommentChange} disabled={disabled}/>
                </Form.Field>
                <Form.Field style={{marginTop: '2em'}}>
                    <Divider horizontal style={{marginBottom: '2em'}}>Ocena szczegółowa</Divider>
                    <RatingField label="Zgodność ze stylem" nameRate="rateStyle" nameComment="commentStyle" commentValue={this.props.commentStyle} defaultRating={this.props.rateStyle} handleRate={this.props.handleRate} handleCommentChange={this.props.handleCommentChange} disabled={disabled}/>
                    <RatingField label="Aromat" nameRate="rateAroma" nameComment="commentAroma" commentValue={this.props.commentAroma} defaultRating={this.props.rateAroma} handleRate={this.props.handleRate} handleCommentChange={this.props.handleCommentChange} disabled={disabled}/>
                    <RatingField label="Wygląd" nameRate="rateLook" nameComment="commentLook" commentValue={this.props.commentLook} defaultRating={this.props.rateLook} handleRate={this.props.handleRate} handleCommentChange={this.props.handleCommentChange} disabled={disabled}/>
                    <RatingField label="Smak" nameRate="rateFlavour" nameComment="commentFlavor" commentValue={this.props.commentFlavor} defaultRating={this.props.rateFlavour} handleRate={this.props.handleRate} handleCommentChange={this.props.handleCommentChange} disabled={disabled}/>
                    <RatingField label="Goryczka" nameRate="rateBitterness" nameComment="commentBitterness" commentValue={this.props.commentBitterness} defaultRating={this.props.rateBitterness} handleRate={this.props.handleRate} handleCommentChange={this.props.handleCommentChange} disabled={disabled}/>
                </Form.Field>

                <Form.Field style={{marginTop: '2em'}}>
                    <Divider horizontal>Uwagi dodatkowe</Divider>
                    <Form.TextArea rows = {2} style={{fontSize: '12px'}} onChange={this.onCommentChange} value={this.props.commentAdditional} disabled={this.props.disabled}/>
                </Form.Field>

            </Container>
        )
    }
}
