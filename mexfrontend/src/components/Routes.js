import React, { Component } from 'react';
import Xbt from '../components/Xbt'
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import App from '../App';
import Home from './Home'
import Nav from './Nav'
import Oi from './Oi'

class Routes extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="App">
                    <Nav></Nav>
                    <Switch>
                        <Route path="/home" exact component={Home} />
                        <Route path="/" exact component={Home} />
                        <Route path="/xbt" exact component={Xbt} />
                        <Route path="/oi" exact component={Oi} />
                        <Route path="/funding" exact component={Home} />
                    </Switch>
                </div>
            </React.Fragment>
        );
    }
}

export default Routes;