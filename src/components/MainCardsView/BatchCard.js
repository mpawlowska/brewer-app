import React from 'react';
import { Card, Icon, Image, Table, Header } from 'semantic-ui-react'


// w propsach będzie dostawała dane konkretnej batch przekazananej przez maindetailsview
export default class BatchCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const extra = (
            <span>
                <Icon name='calendar' />
                <span>{this.props.date}</span>
            </span>
        );

        // image będzie wzięty z danych usera - plik zapiany przez usera
        // Card będzie miało Link to = ... i przekierowywało do strony ze szczegółami warki
        return(
            <Card color="green" style={{width: '14em'}}>
                {/*<Image src={this.props.batch.files.main_image} alt="Zdjęcie warki" style={{height: '10em', width: '14em'}}/>*/}
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




