import React from "react";
import { Route, Switch } from "react-router-dom";
import "normalize.css";
import MainActionButtons from "./MainActionButtons/MainActionButtons.js"
import MainCardsView from "./MainCardsView/MainCardsView";
import MainListView from "./MainListView/MainListView";
import DetailsView from "./DetailsView/DetailsView";

export default class MyBatches extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            batches: [],
        }
    }

    componentWillMount() {
        // setTimeout(() => {
        const batchesRef = firebase.database().ref();

        batchesRef.on("value", snap => {
            let batches = [];
            snap.forEach(childSnapshot => {
                let batch = childSnapshot.val();
                batch.key = childSnapshot.key;

                batches.push(batch);

                this.setState({
                    batches: batches
                });
            });

        });
        // }, 1000)
    }

    /* Dane z Firebase powyżej będą synchronizowały się po każdej zmienie w bazie. Value odpala się nie tylko kiedy za pierwszym razem złapie event listenera, ale też za każdym razem kiedy item jest dodawany do bazy lub usuwany
     */

    render() {

        const { batches } = this.state;
        const { pathToGoBack } = this.props;

        return (
            <div>
                <MainActionButtons />
                <Switch>
                    <Route
                        exact path="/"
                        render={(routeProps) => (
                            <MainCardsView {...routeProps} batches={batches} pathSave={this.props.pathSave} />
                        )}
                    />
                    <Route
                        exact path="/mybatches"
                        render={(routeProps) => (
                            <MainCardsView {...routeProps} batches={batches} pathSave={this.props.pathSave} />
                        )}
                    />
                    <Route
                        exact path="/mybatches/cards"
                        render={(routeProps) => (
                            <MainCardsView {...routeProps} batches={batches} pathSave={this.props.pathSave} />
                        )}
                    />
                    <Route
                        exact path="/mybatches/list"
                        render={(routeProps) => (
                            <MainListView {...routeProps} batches={batches} pathSave={this.props.pathSave} />
                        )}
                    />
                </Switch>
                <Route path="/mybatches/newbatch"
                       render = {(routeProps) => (
                           <DetailsView {...routeProps} view="add" pathToGoBack={pathToGoBack} />
                       )}
                />
                <Route path="/mybatches/batchdetails/:batchKey"
                       render = {(routeProps) => (
                           <DetailsView {...routeProps} batches={batches} view="preview" pathToGoBack={pathToGoBack} />
                       )}
                />
            </div>
        )
    }
};
