import React from "react";
import { Container, Form, Rating, Divider } from "semantic-ui-react"


export const Rating_Comments = (props) => {

    const { disabled, commentGeneral, commentStyle, commentAroma, commentLook, commentFlavor, commentBitterness, commentAdditional, rateGeneral, rateStyle, rateAroma, rateLook, rateFlavor, rateBitterness } = props;

    const onCommentChange = (e) => {
        const text = e.target.value;
        const nameComment = "commentAdditional";

        props.handleCommentChange(nameComment, text)
    };

    return (
        <Container style={{height: "100%"}}>

            <Form.Field style={{marginTop: "1em"}}>
                <RatingField label="Ocena ogólna" nameRate="rateGeneral" nameComment="commentGeneral" commentValue={commentGeneral} defaultRating={rateGeneral} handleRate={props.handleRate} handleCommentChange={props.handleCommentChange} disabled={disabled} />
            </Form.Field>

            <Form.Field style={{marginTop: "2em"}}>
                <Divider horizontal style={{marginBottom: "2em"}}>Ocena szczegółowa</Divider>
                <RatingField label="Zgodność ze stylem" nameRate="rateStyle" nameComment="commentStyle" commentValue={commentStyle} defaultRating={rateStyle} handleRate={props.handleRate} handleCommentChange={props.handleCommentChange} disabled={disabled} />
                <RatingField label="Aromat" nameRate="rateAroma" nameComment="commentAroma" commentValue={commentAroma} defaultRating={rateAroma} handleRate={props.handleRate} handleCommentChange={props.handleCommentChange} disabled={disabled} />
                <RatingField label="Wygląd" nameRate="rateLook" nameComment="commentLook" commentValue={commentLook} defaultRating={rateLook} handleRate={props.handleRate} handleCommentChange={props.handleCommentChange} disabled={disabled} />
                <RatingField label="Smak" nameRate="rateFlavor" nameComment="commentFlavor" commentValue={commentFlavor} defaultRating={rateFlavor} handleRate={props.handleRate} handleCommentChange={props.handleCommentChange} disabled={disabled} />
                <RatingField label="Goryczka" nameRate="rateBitterness" nameComment="commentBitterness" commentValue={commentBitterness} defaultRating={rateBitterness} handleRate={props.handleRate} handleCommentChange={props.handleCommentChange} disabled={disabled} />
            </Form.Field>

            <Form.Field style={{marginTop: "2em"}}>
                <Divider horizontal>Uwagi dodatkowe</Divider>
                <Form.TextArea rows = {2} style={{fontSize: "12px"}} onChange={onCommentChange} value={commentAdditional} disabled={disabled}/>
            </Form.Field>

        </Container>
    )
};


const RatingField = (props) => {

    const { disabled, label, defaultRating, commentValue, nameRate, nameComment } = props;

    const onRate = (e, {rating}) => {
        props.handleRate(nameRate, rating)
    };

    const onCommentChange = (e) => {
        let text = e.target.value;
        props.handleCommentChange(nameComment, text)
    };

    return (
        <Form.Group>
            <Form.Field width={8} style={{textAlign: "center"}}>
                <label>{label}</label>
                <Rating icon="star" maxRating={7} defaultRating={defaultRating} disabled={disabled} clearable onRate={onRate}/>
            </Form.Field>

            <Form.Field width={8} >
                <Form.TextArea rows={2} placeholder="Komentarz..." style={{fontSize: "12px"}} value={commentValue} onChange={onCommentChange} disabled={disabled}/>
            </Form.Field>
        </Form.Group>
    )
};

