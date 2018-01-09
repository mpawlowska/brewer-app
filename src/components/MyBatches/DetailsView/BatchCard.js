import React from "react";
import { Card, Icon, Image, Table, Header } from "semantic-ui-react";


export default class BatchCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            imageUrlFromBase: "",
            imageUrlFromInput: ""
        }
    }

    componentWillMount() {
        if(this.props.isImageInBase === "true") {
            const storage = firebase.storage();
            const imageRef = storage.ref(`images/${this.props.batchKey}`);
            let that = this;

            imageRef.getDownloadURL().then((url) => {
                that.setState({
                    imageUrlFromBase: url
                })
            });
        }
    }

    /*
    TBD
     storageRef.child("file.png").getDownloadURL().then(onResolve, onReject);

     function onResolve(foundURL) {
     //stuff
     }

     function onReject(error) {
     console.log(error.code);
     }
     */

    componentWillReceiveProps(nextProps) {
        const { imageUrl } = nextProps;
        if(imageUrl) {
            this.setState({
                imageUrlFromInput: imageUrl
            })
        } else {
            this.setState({
                imageUrlFromInput: ""
            })
        }
    }

    render() {
        const { name, style, ibu, alcohol, density, date } = this.props;
        const { imageUrlFromInput, imageUrlFromBase } = this.state;
        let imageUrl;
        {this.state.imageUrlFromInput ? imageUrl = imageUrlFromInput : imageUrl = imageUrlFromBase}

        return(
            <Card color="green" style={{width: "14em"}}>
                {imageUrl && <Image src={imageUrl} alt="Zdjęcie warki"/>}
                <Card.Content>
                    <Card.Header textAlign="center">
                        {name}
                    </Card.Header>
                    <Table basic="very">
                        <Table.Body>

                            <Table.Row>
                                <Table.Cell>
                                    <Header as="h4">
                                        <Header.Content>
                                            Styl
                                        </Header.Content>
                                    </Header>
                                </Table.Cell>
                                <Table.Cell style={{fontWeight: "bold"}}>
                                    {style}
                                </Table.Cell>
                            </Table.Row>

                            <Table.Row>
                                <Table.Cell>
                                    <Header as="h5">
                                        <Header.Content>
                                            IBU
                                        </Header.Content>
                                    </Header>
                                </Table.Cell>
                                <Table.Cell>
                                    {ibu}
                                </Table.Cell>
                            </Table.Row>

                            <Table.Row>
                                <Table.Cell>
                                    <Header as="h5">
                                        <Header.Content>
                                            Alkohol
                                        </Header.Content>
                                    </Header>
                                </Table.Cell>
                                <Table.Cell>
                                    {alcohol}
                                </Table.Cell>
                            </Table.Row>

                            <Table.Row>
                                <Table.Cell>
                                    <Header as="h5">
                                        <Header.Content>
                                            Gęstość
                                        </Header.Content>
                                    </Header>
                                </Table.Cell>
                                <Table.Cell>
                                    {density}
                                </Table.Cell>
                            </Table.Row>

                        </Table.Body>
                    </Table>
                </Card.Content>
                <Card.Content extra>
                    <span>
                        <Icon name="calendar" />
                        <span>{date}</span>
                    </span>
                </Card.Content>
            </Card>
        )
    }
}




