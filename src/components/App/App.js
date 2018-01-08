import React from "react";
import { Route, Switch } from "react-router-dom";
import "normalize.css";
import Header from "../Header/Header.js";
import MainActionButtons from "../MainActionButtons/MainActionButtons.js"
import MainCardsView from "../MainCardsView/MainCardsView";
import MainListView from "../MainListView/MainListView";
import DetailsView from "../DetailsView/DetailsView";


export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            batches: [],
            view: "/cards",
        }
    }

    getBatches = (batches) => {
        this.setState({
            batches: batches
        })
    };

    onViewChange = (view) => {
        this.state.view == view ||
        this.setState({
            view: view
        })
    };

    render() {
        
        const { batches, view } = this.state;
        
        return (
            <div className="container">
                <Header pathToGoBack={view} />
                <main style={{marginTop: "6em"}}>
                    <MainActionButtons />
                    <Switch>
                        <Route
                            exact path="/"
                            render={(routeProps) => (
                                <MainCardsView {...routeProps} getBatches={this.getBatches} pathSave={this.onViewChange} addImageToStorageFromApp={this.addImageToStorageFromApp}/>
                            )}
                        />
                        <Route
                            exact path="/cards"
                            render={(routeProps) => (
                                <MainCardsView {...routeProps} getBatches={this.getBatches} pathSave={this.onViewChange} addImageToStorageFromApp={this.addImageToStorageFromApp}/>
                            )}
                        />
                        <Route
                            exact path="/list"
                            render={(routeProps) => (
                               <MainListView {...routeProps} batches={batches} pathSave={this.onViewChange} />
                           )}
                        />
                    </Switch>
                    <Route path="/newbatch"
                           render = {(routeProps) => (
                               <DetailsView {...routeProps} view="add" pathToGoBack={view} addImageToStorageFromApp={this.addImageToStorageFromApp}/>
                           )}
                    />
                    <Route path="/batchdetails/:batchKey"
                           render = {(routeProps) => (
                               <DetailsView {...routeProps} batches={batches} view="preview" pathToGoBack={view} addImageToStorageFromApp={this.addImageToStorageFromApp}/>
                           )}
                    />
                </main>
            </div>
        )
    }
};
