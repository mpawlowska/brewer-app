import React from 'react';
import { Card, Icon, Image, Table, Header } from 'semantic-ui-react';


export default class BatchCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            imageUrl: ''
        }
    }

    componentWillMount() {
        const storage = firebase.storage();
        const imageRef = storage.ref(`images/${this.props.batchKey}`);
        let that = this;

        imageRef.getDownloadURL().then( url => {
            that.setState({
                imageUrl: url
            })
        });
    }

    render() {
        const extra = (
            <span>
                <Icon name='calendar' />
                <span>{this.props.date}</span>
            </span>
        );
        return(

            <Card color="green" style={{width: '14em'}}>
                <Image src={this.state.imageUrl} alt="Zdjęcie warki"/>
                <Card.Content>
                    <Card.Header textAlign="center">
                        {this.props.name}
                    </Card.Header>
                    <Table basic='very'>
                        <Table.Body>

                            <Table.Row>
                                <Table.Cell>
                                    <Header as='h4'>
                                        <Header.Content>
                                            Styl
                                        </Header.Content>
                                    </Header>
                                </Table.Cell>
                                <Table.Cell style={{fontWeight: 'bold'}}>
                                    {this.props.style}
                                </Table.Cell>
                            </Table.Row>

                            <Table.Row>
                                <Table.Cell>
                                    <Header as='h5'>
                                        <Header.Content>
                                            IBU
                                        </Header.Content>
                                    </Header>
                                </Table.Cell>
                                <Table.Cell>
                                    {this.props.ibu}
                                </Table.Cell>
                            </Table.Row>

                            <Table.Row>
                                <Table.Cell>
                                    <Header as='h5'>
                                        <Header.Content>
                                            Alkohol
                                        </Header.Content>
                                    </Header>
                                </Table.Cell>
                                <Table.Cell>
                                    {this.props.alcohol}
                                </Table.Cell>
                            </Table.Row>

                            <Table.Row>
                                <Table.Cell>
                                    <Header as='h5'>
                                        <Header.Content>
                                            Gęstość
                                        </Header.Content>
                                    </Header>
                                </Table.Cell>
                                <Table.Cell>
                                    {this.props.density}
                                </Table.Cell>
                            </Table.Row>

                        </Table.Body>
                    </Table>
                </Card.Content>
                <Card.Content extra>
                    {extra}
                </Card.Content>
            </Card>
        )
    }
}




