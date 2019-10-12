import React, {Component} from 'react';
import LoginScreen from "./components/loginscreen/loginscreen";
import ProfileScreen from "./components/profilescreen/profilescreen";

class App extends Component{

    render(){
        return(
            <div>
                <div className="container">
                    <ProfileScreen />                    
                    <h1>Hello World {this.props.name}</h1>
                </div>
            </div>
        );
    }
}

export default App;