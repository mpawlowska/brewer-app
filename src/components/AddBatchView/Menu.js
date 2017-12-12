import React from 'react';
import {
    Route,
    Switch,
    Link
} from 'react-router-dom';
import { Menu, Segment, Form, Button } from 'semantic-ui-react'
import Details from './MenuComponents/Details';
import Recipe from './MenuComponents/Recipe';
import Rating_Comments from './MenuComponents/Rating_Comments';
import Files from './MenuComponents/files';

export default class AddMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeItem: 'details'
        }
    }

    handleItemClick = (e, { name }) => {
        console.log(name);
        this.setState({activeItem: name})
    };

    render() {
        const { activeItem } = this.state;
        return (
            <div style={{height: '100%', width: '75%'}}>
                <Menu attached='top' pointing secondary>
                    <Link to="/newbatch">
                        <Menu.Item name="details" active={activeItem === 'details'} onClick={this.handleItemClick}>Podsumowanie
                        </Menu.Item>
                    </Link>
                    <Link to="/newbatch/recipe">
                        <Menu.Item name="recipe" active={activeItem === 'recipe'} onClick={this.handleItemClick}>Receptura
                        </Menu.Item>
                    </Link>
                    <Link to="/newbatch/rating_comments">
                        <Menu.Item name="rating-comments" active={activeItem === 'rating-comments'} onClick={this.handleItemClick}>Ocena i uwagi
                        </Menu.Item>
                    </Link>
                    <Link to="/newbatch/files">

                        <Menu.Item name="files" active={activeItem === 'files'} onClick={this.handleItemClick}>
                            Załączniki
                        </Menu.Item>
                    </Link>

                </Menu>
                <Segment attached='bottom'>
                    <Form>
                        <Switch>
                            <Route exact path="/newbatch" component={ Details }></Route>
                            <Route exact path="/newbatch/recipe" component={ Recipe }></Route>
                            <Route exact path="/newbatch/rating-comments" component={ Rating_Comments }></Route>
                            <Route exact path="/newbatch/files" component={ Files }></Route>
                        </Switch>
                        <Button type='submit'>Zakończ dodawanie warki</Button>
                    </Form>
                </Segment>
            </div>
        )
    }
}