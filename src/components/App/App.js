import React from "react";
import { Route, Switch } from "react-router-dom";
import "normalize.css";
import Header from "../MyBatches/Header/Header.js";
import MyBatches from "../MyBatches/MyBatches";
import { Calculators } from "../Calculators/Calculators";

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            view: "/mybatches"
        }
    }

    handleViewChange = (view) => {
        this.state.view === view ||
        this.setState({ view })
    };

    render() {

        const { view } = this.state;
        
        return (
            <div className="container">

                <Header pathToGoBack={view} />

                <main style={{marginTop: "6em"}}>
                    <Switch>
                        <Route
                            exact path="/"
                            render={(routeProps) => (
                                <MyBatches {...routeProps} pathSave={this.handleViewChange} pathToGoBack={view} />
                                )}
                        />
                        <Route
                            path="/mybatches"
                            render={(routeProps) => (
                                <MyBatches {...routeProps} pathSave={this.handleViewChange} pathToGoBack={view} />
                                )}
                        />
                        <Route
                            exact path="/calculators" component={Calculators}
                        />
                    </Switch>
                </main>

            </div>
        )
    }
};
