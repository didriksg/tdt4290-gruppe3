import React, {Component} from 'react';
import LoginScreen from "./components/loginscreen/LoginScreen";
import CaseScreen from "./components/casescreen/CaseScreen.jsx";

import { Provider } from 'react-redux';
import configureStore from './store'
import {loadUser} from "./actions/authActions";

const store = configureStore();

class App extends Component {
    componentDidMount() {
        store.dispatch(loadUser());
    }

    render() {
        return (
            <Provider store={store}>
                <div>
                    <div className="container">
                        {/*<LoginScreen/>*/}
                        <h1>Hello World {this.props.name}</h1>
                    </div>
                </div>
            </Provider>
        );
    }
}

export default App;