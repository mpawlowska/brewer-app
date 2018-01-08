import React from 'react';
import { List, Button } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import DeleteBatchPopup from "../MainActionButtons/DeleteBatchPopup";

export default class BatchListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { link, batch } = this.props;
        const { name, style, ibu, alcohol, density } = this.props.batch.details;
        const trigger = <Button size="tiny" content="Usuń"/>;

        return (
            <List.Item>
                <List.Content floated='right' verticalAlign="bottom" style={{position: 'relative', top: '3em'}}>
                    <DeleteBatchPopup batchKey={batch.key} trigger={trigger} />
                </List.Content>
                <List.Icon name='beer' size='large' verticalAlign='middle'/>
                <Link to = {link}>
                    <List.Content verticalAlign="middle">
                        <List.Header style={{fontSize: "1.3em", paddingBottom: "1em"}}>{name}</List.Header>
                        <List.Description>
                            <List divided horizontal relaxed="very">
                                <List.Item>
                                    <List.Content>
                                        <List.Header>Styl</List.Header>
                                        <List.Description style={{textAlign: "center"}}>{style}</List.Description>
                                    </List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Content>
                                        <List.Header>IBU</List.Header>
                                        <List.Description style={{textAlign: "center"}}>{ibu}</List.Description>
                                    </List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Content>
                                        <List.Header>Alkohol</List.Header>
                                        <List.Description style={{textAlign: "center"}}>{alcohol}</List.Description>
                                    </List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Content>
                                        <List.Header>Gęstość</List.Header>
                                        <List.Description style={{textAlign: "center"}}>{density}</List.Description>
                                    </List.Content>
                                </List.Item>
                            </List>
                        </List.Description>
                    </List.Content>
                </Link>
            </List.Item>
        )
    }
}
