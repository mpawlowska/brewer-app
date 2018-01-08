import React from "react";
import { Route, Switch } from "react-router-dom";
import "normalize.css";
import Header from "../MyBatches/Header/Header.js";
import MyBatches from "../MyBatches/MyBatches";
import Calculators from "../Calculators/Calculators";

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            view: "/mybatches",
            windowHref: "mybatches"
        }
    }

    onViewChange = (view) => {
        this.state.view == view ||
        this.setState({
            view: view
        })
    };

    // componentDidMount() {
    //     const windowHref = window.location.href;
    //     const myBatchesView = windowHref.indexOf("mybatches");
    //
    //     console.log('APP href', myBatchesView);
    //
    //     if (myBatchesView === -1) {
    //         this.setState({
    //             windowHref: "calculators"
    //         });
    //     } else {
    //         this.setState({
    //             windowHref: "mybatches"
    //         });
    //     }
    // };


    render() {

        console.log('App render');
        
        const { view, windowHref } = this.state;
        
        return (
            <div className="container">
                <Header pathToGoBack={view} windowHref={windowHref} />
                <main style={{marginTop: "6em"}}>
                    <Switch>
                        <Route
                            exact path="/"
                            render={(routeProps) => (
                                <MyBatches {...routeProps} pathSave={this.onViewChange} pathToGoBack={view} />
                                )}
                        />
                        <Route
                            path="/mybatches"
                            render={(routeProps) => (
                                <MyBatches {...routeProps} pathSave={this.onViewChange} pathToGoBack={view} />
                                )}
                        />
                        <Route
                            exact path="/calculators"
                            render={(routeProps) => (
                                <Calculators {...routeProps} />
                                )}
                        />
                    </Switch>
                </main>
            </div>
        )
    }
};
