import React from 'react';
import { List } from 'semantic-ui-react'


// // w propsach będzie dostawała dane konkretnej batch przekazananej przez mainListview
export default class BatchListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <List.Item >
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
                                    <List.Description style={{textAlign: "center"}}>{this.props.batch.details.ibu}</List.Description>
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
                                    <List.Header>Gęstość</List.Header>
                                    <List.Description style={{textAlign: "center"}}>{this.props.batch.details.density}</List.Description>
                                </List.Content>
                            </List.Item>
                        </List>
                    </List.Description>
                </List.Content>
            </List.Item>
        )
    }
}
