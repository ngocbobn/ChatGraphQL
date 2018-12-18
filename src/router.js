import React, { Component } from 'react';
import { Router, Route, Switch } from "react-router-dom";
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import Dashboard from './pages/dashboard';
import CreateNewSong from './pages/createNewSong';
import Chat from './pages/chat';

class PublicRouter extends Component {
    render() {
        return (
            <Router history={this.props.history}>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/create-new-song" component={CreateNewSong} />
                    <Route exact path="/chat" component={Chat} />
                </Switch>
            </Router>
        );
    }
}

export default PublicRouter;