import React from "react";
import { Form, Container, Input } from "semantic-ui-react"


const Details_Input = (props) => {
    const { label, disabled, name, value } = props;
    return (
        <Form.Field>
            <label>{label}</label>
            <Input disabled={disabled} type="text" name={name} onChange={props.onChange} value={value}/>
        </Form.Field>
    )
};

export const Details = (props) => {

    const { disabled, name, style, date, volume, ibu, srm, density, alcohol, type } = props;
    const widths = "equal";

    const handleInputChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        props.componentUpdate(name, value);
    };

    return (
        <Container style={{height: "100%"}}>
            <Form.Group widths={widths}>
                <Details_Input disabled={disabled} label="Nazwa" name="name" onChange={handleInputChange} value={name}/>
                <Details_Input disabled={disabled} label="Styl" name="style" onChange={handleInputChange} value={style}/>
            </Form.Group>
            <Form.Group widths={widths}>
                <Details_Input disabled={disabled} label="Data warzenia" name="date" onChange={handleInputChange} value={date}/>
                <Details_Input disabled={disabled} label="Wielkość" name="volume" onChange={handleInputChange} value={volume}/>
            </Form.Group>
            <Form.Group widths={widths}>
                <Details_Input disabled={disabled} label="IBU" name="ibu" onChange={handleInputChange} value={ibu}/>
                <Details_Input disabled={disabled} label="SRM" name="srm" onChange={handleInputChange} value={srm}/>
            </Form.Group>
            <Form.Group widths={widths}>
                <Details_Input disabled={disabled} label="Gęstość" name="density" onChange={handleInputChange} value={density}/>
                <Details_Input disabled={disabled} label="Alkohol" name="alcohol" onChange={handleInputChange} value={alcohol}/>
            </Form.Group>
            <Details_Input disabled={disabled} label="Typ" name="type" onChange={handleInputChange} value={type} />
        </Container>
    )
};

