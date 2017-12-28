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

        // this.state = {
        //     name: '',
        //     style: '',
        //     date: '',
        //     volume: '',
        //     ibu: '',
        //     srm: '',
        //     density: '',
        //     alcohol: '',
        //     type: ''
        // }
    }

    handleInputChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        // this.setState({
        //     [name]: value
        //     });

        this.props.componentUpdate(name, value);
    };

    // gdzie umieścić tę moetodę? willUpadte i didUpdate pwooduje zapętlenie updatów i błąd
    // this.props.componentUpdate(this.state);


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
                <Details_Input disabled={this.props.disabled} label="Typ" name="type"/>
            </Container>
        )
    }
}

