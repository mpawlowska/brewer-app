import React from 'react';
import { List } from 'semantic-ui-react'


// // w propsach będzie dostawała dane konkretnej batch przekazananej przez mainListview
export default class BatchListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <List.Item as="a">
                <List.Icon name='beer' size='large' verticalAlign='middle'/>
                <List.Content>
                    <List.Header>{this.props.batch.details.name}</List.Header>
                    <List.Description>
                        <List size="small" divided horizontal>
                            <List.Item>
                                <List.Content>
                                    <List.Header>Styl</List.Header>
                                    <List.Description style={{textAlign: "center"}}>{this.props.batch.details.style}</List.Description>
                                </List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Content>
                                    <List.Header>IBU</List.Header>
                                    <List.Description style={{textAlign: "center"}}>{this.props.batch.details.IBU}</List.Description>
                                </List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Content>
                                    <List.Header>Alkohol</List.Header>
                                    <List.Description style={{textAlign: "center"}}>{this.props.batch.details.alcohol}</List.Description>
                                </List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Content>
                                    <List.Header>Wielkość</List.Header>
                                    <List.Description style={{textAlign: "center"}}>{this.props.batch.details.volume}</List.Description>
                                </List.Content>
                            </List.Item>
                        </List>
                    </List.Description>
                </List.Content>
            </List.Item>
        )
    }
}
