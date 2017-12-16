import React from 'react';
import { Route, Switch} from 'react-router-dom';
import 'normalize.css';
import Header from '../Header/Header.js';
import MainActionButtons from '../MainActionButtons/MainActionButtons.js'
import MainCardsView from '../MainCardsView/MainCardsView';
import MainListView from '../MainListView/MainListView';
import AddBatchView from '../AddBatchView/AddBatchView';
import BatchDetailsView from '../BatchDetailsView/BatchDetailsView';


export default class App extends React.Component {
    constructor(props) {
        super(props);

        // pobieram batches z Firebase: - trzeba będzie to umieścić w innej metodzie, aby dane się synchronizowały po zmianie w bazie
        const batchesRef = firebase.database().ref();
        let batches = [];

        batchesRef.on('value', snap => {
            snap.forEach((childSnapshot) => {
                batches.push(childSnapshot.val());
            })
        });

        this.state = {
            batches: batches,
            view: '/cards'
        }
    }

    onViewChange = (view) => {
        this.state.view == view ||
        this.setState({
            view: view
        })
    };

    render() {
        return (
            <div className='container'>
                <Header pathToGoBack={this.state.view}/>
                <main style={{marginTop: '6em'}}>
                    <MainActionButtons />
                    <Switch>
                        <Route
                            exact path="/"
                            render={(routeProps) => (
                                <MainCardsView {...routeProps} batches={this.state.batches} pathSave={this.onViewChange}/>
                            )}
                        />
                        <Route
                            exact path="/cards"
                            render={(routeProps) => (
                                <MainCardsView {...routeProps} batches={this.state.batches} pathSave={this.onViewChange}/>
                            )}
                        />
                        <Route
                            exact path="/list"
                            render={(routeProps) => (
                               <MainListView {...routeProps} batches={this.state.batches} pathSave={this.onViewChange}/>
                           )}
                        />
                    </Switch>
                    <Route path='/newbatch'
                           render = {(routeProps) => (
                               <AddBatchView {...routeProps} pathToGoBack={this.state.view}/>
                           )}
                    />
                    <Route path='/batchdetails/:batchId'
                           render = {(routeProps) => (
                               <BatchDetailsView {...routeProps} batches={this.state.batches} pathToGoBack={this.state.view}/>
                           )}
                    />

                    {/*<Switch>*/}
                        {/*<Route exact path="/" component={ MyWarkiContent }></Route>*/}
                        {/*<Route exact path="/recipe" component={ CalculatorsContent }></Route>*/}
                        {/*<Route path='*' render={*/}
                            {/*() => <div>Nie znaleziono strony.</div>*/}
                        {/*}></Route>*/}
                    {/*</Switch>*/}
                </main>
            </div>
        )
    }
};
