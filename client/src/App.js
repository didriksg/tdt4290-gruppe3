import React, {Component} from 'react';
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import HomeScreen from "./components/homescreen/homescreen";
import LoginScreen from "./components/loginscreen/LoginScreen";
import Arkiv from "./components/arkiv/arkiv";
import MonthlyReport from "./components/monthlyReport/monthlyReport";
import CaseScreen from "./components/casescreen/CaseScreen";
import OverviewBoard from "./components/table/OverviewBoard";
import CasePage from "./components/casepage/CasePage";

import {loadUser} from "./actions/authActions";
import configureStore from './store'
import PrivateRoute from "./components/PrivateRoute";


const store = configureStore();

class App extends Component {
    constructor(props) {
        super(props);
        store.dispatch(loadUser());
    }


    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route path="/login" component={LoginScreen}/>
                        <PrivateRoute exact path="/" component={HomeScreen}/>
                        <PrivateRoute path="/arkiv" component={Arkiv}/>
                        <PrivateRoute path="/rapport" component={MonthlyReport}/>
                        <PrivateRoute path="/ny-sak" component={CaseScreen}/>
                        <PrivateRoute path="/alle-saker" component={OverviewBoard}/>
                        <PrivateRoute path="/sak" component={CasePage}/>
                    </Switch>
                </Router>
            </Provider>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById("app"));