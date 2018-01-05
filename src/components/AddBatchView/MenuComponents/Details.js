import React from 'react';
import { Form, Container, Input } from 'semantic-ui-react'


const Details_Input = (props) => {
    return (
        <Form.Field>
            <label>{props.label}</label>
            <Input disabled={props.disabled} type="text" name={props.name} onChange={props.onChange} value={props.value}/>
        </Form.Field>
    )
};

export default class Details extends React.Component {
    constructor(props) {
        super(props);
    }

    handleInputChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        this.props.componentUpdate(name, value);
    };

    render() {
        return (
            <Container style={{height: "100%"}}>
                <Form.Group widths="equal">
                    <Details_Input disabled={this.props.disabled} label="Nazwa" name="name" onChange={this.handleInputChange} value={this.props.name}/>
                    <Details_Input disabled={this.props.disabled} label="Styl" name="style" onChange={this.handleInputChange} value={this.props.style}/>
                </Form.Group>
                <Form.Group widths="equal">
                    <Details_Input disabled={this.props.disabled} label="Data warzenia" name="date" onChange={this.handleInputChange} value={this.props.date}/>
                    <Details_Input disabled={this.props.disabled} label="Wielkość" name="volume" onChange={this.handleInputChange} value={this.props.volume}/>
                </Form.Group>
                <Form.Group widths="equal">
                    <Details_Input disabled={this.props.disabled} label="IBU" name="ibu" onChange={this.handleInputChange} value={this.props.ibu}/>
                    <Details_Input disabled={this.props.disabled} label="SRM" name="srm" onChange={this.handleInputChange} value={this.props.srm}/>
                </Form.Group>
                <Form.Group widths="equal">
                    <Details_Input disabled={this.props.disabled} label="Gęstość" name="density" onChange={this.handleInputChange} value={this.props.density}/>
                    <Details_Input disabled={this.props.disabled} label="Alkohol" name="alcohol" onChange={this.handleInputChange} value={this.props.alcohol}/>
                </Form.Group>
                <Details_Input disabled={this.props.disabled} label="Typ" name="type" onChange={this.handleInputChange} value={this.props.type} />
            </Container>
        )
    }
}

