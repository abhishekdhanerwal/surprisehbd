import React, {useState, useEffect} from 'react';

import {Route, Switch, Redirect, withRouter} from 'react-router-dom';

import style from './App.css';
import classNames from 'classnames';


import HomePage from './containers/HomePage/HomePage';
import DashboardPage from './containers/DashboardPage/DashboardPage';

function App(props) {
    const containerStyle = classNames("container-fluid", {[style.bodyContainerMargin]:true});
    
    let routes = (
        <React.Fragment>
            <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/dashboard" exact component={DashboardPage} />
            </Switch>
        </React.Fragment>
    );

    return (
        <React.Fragment>
            {routes}
        </React.Fragment>
    );
}

export default withRouter(App);
