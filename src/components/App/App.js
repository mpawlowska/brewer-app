import React from 'react';
import { Route, Switch } from 'react-router-dom';
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

        this.state = {
            batches: [],
            view: '/cards'
        }
    }

    componentWillMount() {
        const batchesRef = firebase.database().ref();

        batchesRef.on('value', snap => {
            let batches = [];
            snap.forEach(childSnapshot => {
                let batch = childSnapshot.val();
                batch.key = childSnapshot.key;

                batches.push(batch);
            });

            this.setState({
                batches: batches
            })
        });
    }

    /* Dane z Firebase powyżej będą synchronizowały się po każdej zmienie w bazie. Value odpala się nie tylko kiedy za pierwszym razem złapie event listenera, ale też za każdym razem kiedy item jest dodawany do bazy lub usuwany
    */

    onViewChange = (view) => {
        this.state.view == view ||
        this.setState({
            view: view
        })
    };

    render() {
        return (
            <div className='container'>
                <Header pathToGoBack={this.state.view} />
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
                               <BatchDetailsView {...routeProps} view="add" pathToGoBack={this.state.view} />
                           )}
                    />
                    <Route path='/batchdetails/:batchKey'
                           render = {(routeProps) => (
                               <BatchDetailsView {...routeProps} view="preview" batches={this.state.batches} pathToGoBack={this.state.view} disabled={true} />
                           )}
                    />
                </main>
            </div>
        )
    }
};
