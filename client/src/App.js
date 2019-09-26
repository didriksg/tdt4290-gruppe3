import React, {Component} from 'react';
import LoginScreen from "./components/loginscreen/loginscreen";

class App extends Component{

    render(){
        return(
            <div>
                <div className="container">
                    <LoginScreen/>                    
                    <h1>Hello World {this.props.name}</h1>
                </div>
            </div>
        )
    }

}

export default App;