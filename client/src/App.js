import React, {Component} from 'react';
import LoginScreen from "./components/loginscreen/loginscreen";
import CaseScreen from './components/casescreen/casescreen.js';

class App extends Component{

    render(){
        return(
            <div>
                <div className="container">
                    <CaseScreen/>         
                    <h1>Hello World {this.props.name}</h1>
                    
                </div>
            </div>
        )
    }

}

export default App;