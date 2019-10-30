import React, {Component} from 'react';
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import LoginScreen from "./components/loginScreen/LoginScreen";
import HomeScreen from "./components/homeScreen/homescreen";
import Arkiv from "./components/arkiv/arkiv";
import MonthlyReport from "./components/monthlyReport/monthlyReport";
import CaseScreen from "./components/caseScreen/CaseScreen";
import ActiveCases from "./components/activeCases/ActiveCases";

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
                        <PrivateRoute path="/rapport" component={MonthlyReport}/>
                        <PrivateRoute path="/ny-sak" component={CaseScreen}/>
                        <PrivateRoute path="/voksen"
                                      component={(props) => <ActiveCases {...props}
                                                                         caseState={0}
                                                                         headerTitle={'Tilgjengelige voksenhenvisnger'}
                                                                         tableTitle={'Alle tilgjengelige' +
                                                                         ' voksenhenvisnger'}
                                                                         isChildrenCase={false}
                                      />}/>

                        <PrivateRoute path="/barn"
                                      component={(props) => <ActiveCases {...props}
                                                                         caseState={0}
                                                                         headerTitle={'Tilgjengelige barnehenvisninger'}
                                                                         tableTitle={'Alle tilgjengelige barnehenvisninger'}
                                                                         isChildrenCase={true}
                                      />}/>
                        <PrivateRoute path="/arkiv"
                                      component={(props) => <ActiveCases {...props}
                                                                         caseState={1}
                                                                         headerTitle={'Arkiv'}
                                                                         tableTitle={'Arkiverte henvisninger'}
                                      />}/>
                    </Switch>
                </Router>
            </Provider>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById("app"));