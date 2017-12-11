import React from 'react';
import {
    Route,
    Switch
} from 'react-router-dom';
import 'normalize.css';
import Header from '../Header/Header.js';
import MainActionButtons from '../MainActionButtons/MainActionButtons.js'
import MainDetailsView from '../MainDetailsView/MainDetailsView';
import MainListView from '../MainListView/MainListView';
import batches from '../../data/batches';


export default class App extends React.Component {
    // constructor(props) {
    //     super(props);
    //
    //     }
    // }

    render() {   
        return (
            <div className='container'>
                <Header />
                <main style={{marginTop: '6em'}}>
                    <MainActionButtons />
                    <Switch>
                        <Route
                            exact path="/cards"
                            render={(routeProps) => (
                                <MainDetailsView {...routeProps}/>
                            )}
                        />
                        <Route
                            exact path="/list"
                            render={(routeProps) => (
                               <MainListView {...routeProps} batches={batches}/>
                           )}
                        />
                    </Switch>
                    {/*<Switch>*/}
                        {/*<Route exact path="/" component={ MyWarkiContent }></Route>*/}
                        {/*<Route exact path="/recipe" component={ RecipeContent }></Route>*/}
                        {/*<Route path='*' render={*/}
                            {/*() => <div>Nie znaleziono strony.</div>*/}
                        {/*}></Route>*/}
                    {/*</Switch>*/}
                </main>
            </div>
        )
    }
};
